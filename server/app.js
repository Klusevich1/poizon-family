const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const http = require("http");
const fs = require("fs");

const {
  getFilters,
  getSearch,
  getData,
  getAllData,
  getProduct,
  postOrder,
} = require("./mongodb");

const app = express();
app.use(express.json({ extended: false }));

const cors = require("cors");
app.use(cors());

app.get("/api/filters", async (req, res) => {
  try {
    const response = await getFilters();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/products", async (req, res) => {
  const { category, page, size, brand, minPrice, maxPrice, sortBy, limit } =
    req.query;
  let minPriceF = (minPrice - 2700) / (1.05 * 14.3);
  let maxPriceF = (maxPrice - 2700) / (1.05 * 14.3);
  console.log(limit);
  const limitF = limit ? parseInt(limit) : 48;
  console.log(limitF);
  try {
    const response = await getData(
      category,
      page,
      limitF,
      size,
      brand,
      minPriceF,
      maxPriceF,
      sortBy
    );
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/result", async (req, res) => {
  const { search } = req.query;
  try {
    const response = await getSearch(search);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    let result = await getProduct(productId);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/order", async (req, res) => {
  const { productId } = req.params;
  try {
    let result = await postOrder(req);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("*", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  const data = fs.readFileSync(process.env.INDEX_PATH, "utf8");
  res.end(data);
});

const server = http.createServer(app);

/*Для выгрузки в интернет*/
const hostname = process.env.INSTANCE_HOST;
const port = process.env.PORT;
server.listen(port, hostname, () => {
  console.log(`Listening https://${hostname}:${port}/`);
});

/*Для локального хоста*/
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
