const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const fs = require("fs");
const axios = require("axios");
const cron = require("node-cron");
const schedule = require("node-schedule");
const { error } = require("console");
const uri =
  "uri";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  await client.connect();
  await prodCollection.createIndex({ "sizes.name": 1, "sizes.value": 1 });
  await prodCollection.createIndex({ vendor: 1 });
  cron.schedule("00 9 1,15 * *", async function () {
    try {
      await prodCollection.deleteMany({});
      // await testCollection.deleteMany({});
      // await categClothesCollection.deleteMany({});
      // await categSneakersCollection.deleteMany({});
      fs.readFile("database/storage.json", "utf8", async function (err, data) {
        if (err) console.log(err);
        else {
          let jsonData = JSON.parse(data);
          jsonData = jsonData.map((product) => {
            if (product.price === 0) {
              const result = jsonData.filter(
                (item) => item.productId === product.productId
              );
              let totalPrice = 0;
              result.map((pr) => (totalPrice += pr.price));
              product.price = parseInt((totalPrice / result.length).toFixed(0)); // Форматировать с двумя знаками после запятой в виде строки
              return product;
            } else {
              return product;
            }
          });
          prodCollection.insertMany(jsonData);
          console.log("Новые данные успешно загружены 1");
        }
      });
    } catch (error) {
      console.error(error);
    }
  });
  cron.schedule("00 05 1,15 * *", async function fetchAndSaveProductDetails() {
    if (fs.existsSync("database/storage.json")) {
      fs.unlinkSync("database/storage.json");
    }
    const spuIds = JSON.parse(fs.readFileSync("database/spuIds.json", "utf8"));
    console.log(spuIds);
    let finishArr = [];

    for (let i = 0; i < spuIds.length; i += 5) {
      const spuIdsChunk = spuIds.slice(i, i + 5);
      const promises = spuIdsChunk.map((spuId) => {
        return axios
          .get(
            `https://poizon-api.com/api/dewu/productDetailWithPrice?spuId=${spuId}`,
            {
              headers: {
                apiKey: "50511ed7-22c3-42f7-82e9-2ca2314daf02",
              },
            }
          )
          .then((objResponse) => {
            console.log(i);
            let objsData = objResponse.data;
            let finishData = {
              title: objsData.detail.title,
              price: 0,
              productId: objsData.detail.spuId,
              variantId: objsData.detail.spuId,
              categoryId: objsData.detail.categoryId,
              vendor: objsData.brandRootInfo.brandItemList[0].brandName,
              images: objsData.image.spuImage.images.map((im) => im.url),
            };
            let spuArr = [finishData];
            objsData.skus.map((sku) => {
              const priceType = sku.price.prices.find(
                (type) => type.tradeType === 2 || type.tradeType === 0
              );
              if (priceType) {
                finishData = {
                  title: objsData.detail.title,
                  price: priceType.price / 100,
                  productId: sku.spuId,
                  variantId: sku.skuId,
                  categoryId: objsData.detail.categoryId,
                  vendor: objsData.brandRootInfo.brandItemList[0].brandName,
                  images: objsData.image.spuImage.images.map((im) => im.url),
                };
                finishData.size = sku.properties.find(
                  (p) => p.level === 1
                ).saleProperty.value;
                spuArr.push(finishData);
              }
            });
            return spuArr;
          })
          .catch((error) => {
            console.log("Error");
            return [];
          });
      });

      const results = await Promise.all(promises);
      finishArr.push(...results.flat());
    }

    fs.writeFile(
      "database/storage.json",
      JSON.stringify(finishArr, null, 2),
      (err) => {
        if (err) throw err;
        console.log("Данные успешно записаны в файл.");
      }
    );
  });
}
run();

const database = client.db("poizonfamily");
const prodCollection = database.collection("products");
const categSneakersCollection = database.collection("categSneakers");
const categClothesCollection = database.collection("categClothes");
const ordCollection = database.collection("orders");
const filtersCollection = database.collection("filters");

const testCollection = database.collection("test");

async function getFilters() {
  try {
    await client.connect();
    const filters = await filtersCollection.find().toArray();
    return filters;
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

async function getSearch(search) {
  try {
    await client.connect();
    const products = await prodCollection
      .find({
        $expr: { $eq: ["$productId", "$variantId"] },
        title: new RegExp(search, "i"),
      })
      .toArray();
    return products;
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

async function getData(
  category,
  page,
  limitF,
  size,
  brand,
  minPriceF,
  maxPriceF,
  sortBy
) {
  try {
    await client.connect();
    let query = {};
    let productIds = await categSneakersCollection.find().toArray();
    productIds = productIds.map((product) => product.id);
    if (size) {
      query["$expr"] = { $ne: ["$productId", "$variantId"] };
      query.size = size;
    } else {
      query["$expr"] = { $eq: ["$productId", "$variantId"] };
    }
    if (category === "sneakers") {
      query.categoryId = { $in: productIds };
    } else if (category === "clothes") {
      query.categoryId = { $nin: productIds };
    }
    if (brand) {
      query.vendor = { $regex: new RegExp(brand), $options: "i" };
    }
    if (minPriceF || maxPriceF) {
      query.price = {};
      if (minPriceF) {
        query.price.$gte = parseInt(minPriceF);
      }
      if (maxPriceF) {
        query.price.$lte = parseInt(maxPriceF);
      }
    }
    let sortCriteria;
    if (sortBy === "increasing") {
      sortCriteria = { price: 1 };
    } else if (sortBy === "decreasing") {
      sortCriteria = { price: -1 };
    } else {
      sortCriteria = {};
    }
    const skip = (page - 1) * limitF;
    const products = await prodCollection
      .find(query)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limitF)
      .toArray();
    const count = await prodCollection.countDocuments(query);
    let data = [count, products];
    return data;
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

async function getAllData() {
  try {
    await client.connect();
    const allProducts = await prodCollection
      .find({ $expr: { $eq: ["$productId", "$variantId"] } })
      .toArray();
    return allProducts;
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

async function getProduct(productId) {
  try {
    await client.connect();
    const result = await prodCollection
      .find({ productId: parseInt(productId) })
      .toArray();
    return result;
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

async function postOrder(req) {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const order = req.body;
    ordCollection.insertOne(order);
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

module.exports = {
  getFilters,
  getSearch,
  getData,
  getAllData,
  getProduct,
  postOrder,
};
