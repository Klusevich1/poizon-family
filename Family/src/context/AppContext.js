import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [searchBanner, setSearchBanner] = useState("");
  const [isActiveSvg, setIsActiveSvg] = useState(() => {
    const storedValue = localStorage.getItem("isActiveSvg");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem("currentPage")) || 1
  );
  const [category, setCategory] = React.useState("");
  const [size, setSize] = React.useState("");
  const [type, setType] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = React.useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [isPaginate, setIsPaginate] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSearchClick = () => {
    setOpenSearch(!openSearch);
  };

  const removeZH = (str) => {
    if (!str) return "";
    const result = str
      .replace(/[\u4e00-\u9fa5]+/g, " ")
      .replace(/\s+/g, " ")
      .replace(/#/g, "");
    if (!/[a-zA-ZА-Яа-я\d]/.test(result)) return "";
    return result.trim();
  };

  const addToCart = (object, activeSize) => {
    let newCart = [...cart];
    let existingProd = newCart.find(
      (item) => object[0].variantId === item.variantId
    );
    console.log(existingProd);
    let itemInCart = {
      variantId: object[0].variantId,
      title: removeZH(object[0].title),
      price: (object[0].price * 1.05 * 14.3 + 2700).toFixed(0),
      url: `https://poizonfamily.ru/product/${object[0].productId}`,
      size: activeSize,
    };
    if (existingProd) {
      existingProd.quantity++;
    } else {
      itemInCart.quantity = 1;
      newCart.push(itemInCart);
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = (variantId) => {
    let newCart = [...cart];
    const index = newCart.findIndex((item) => item.variantId === variantId);
    if (index !== -1) {
      newCart.splice(index, 1);
    } else {
      console.log("Товар не найден в корзине");
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const toggleFavorites = (item) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const index = favorites.findIndex(
      (favItem) => favItem.productId === item.productId
    );
    if (index !== -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push({
        productId: item.productId,
        title: item.title,
        images: item.images,
        price: item.price,
      });
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const toggleBtns = (item, action) => {
    let newCart = [...cart];
    const product = newCart.find((obj) => obj.variantId === item.variantId);
    console.log(product);
    if (product) {
      if (action === "plus") {
        product.quantity++;
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else if (action === "minus") {
        if (product.quantity === 1) {
          removeFromCart(product.variantId);
        } else {
          product.quantity--;
          setCart(newCart);
          localStorage.setItem("cart", JSON.stringify(newCart));
        }
      }
    } else {
      console.log("Товар не найден в корзине");
    }
  };

  return (
    <AppContext.Provider
      value={{
        open,
        openSearch,
        isActiveSvg,
        setIsActiveSvg,
        handleClick,
        handleSearchClick,
        removeZH,
        addToCart,
        removeFromCart,
        toggleFavorites,
        toggleBtns,
        currentPage,
        setCurrentPage,
        search,
        setSearch,
        searchBanner,
        setSearchBanner,
        category,
        setCategory,
        type,
        setType,
        size,
        setSize,
        brand,
        setBrand,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        sortBy,
        setSortBy,
        isFiltered,
        setIsFiltered,
        isPaginate,
        setIsPaginate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
