import React, { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { AppContext } from "../../context/AppContext";
import { BurgerMenu } from "../../components/BurgerMenu/BurgerMenu";
import styles from "./Catalog.module.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { CardItems } from "../../components/CardItems/CardItems";
import { Filter } from "../../components/Filter/Filter";
import classNames from "classnames";
import { Loading } from "../../components/Loading/Loading";
import { Pagination } from "../../components/Pagination/Pagination";
import { Footer } from "../../components/Footer/Footer";
import { Sorting } from "../../components/Sorting/Sorting";

export const Catalog = () => {
  const {
    open,
    category,
    setCategory,
    type,
    setSize,
    size,
    setBrand,
    brand,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    setIsPaginate,
    isPaginate,
    currentPage,
    setCurrentPage,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numOfPages, setNumOfPages] = useState(0);

  const params = [
    category && `category=${category}`,
    type && `type=${type}`,
    size && `size=${size}`,
    brand && `brand=${brand}`,
    minPrice && `minPrice=${minPrice}`,
    maxPrice && `maxPrice=${maxPrice}`,
  ]
    .filter(Boolean)
    .join("&");
  const link = `/products?${params}`;
  useEffect(() => {
    setProducts([]);
    setIsPaginate(false);
    const queryParams = new URLSearchParams(location.search);
    const categoryReq = queryParams.get("category");
    const typeReq = queryParams.get("type");
    const sizeReq = queryParams.get("size");
    const brandReq = queryParams.get("brand");
    const minPriceReq = parseInt(queryParams.get("minPrice"));
    const maxPriceReq = parseInt(queryParams.get("maxPrice"));
    const pageReq = parseInt(queryParams.get("page"));
    const sortByReq = queryParams.get("sortBy");
    pageReq && localStorage.setItem("currentPage", pageReq);
    localStorage.setItem("selectedSize", sizeReq ? sizeReq : "Любой размер");
    localStorage.setItem("selectedBrand", brandReq ? brandReq : "Любой бренд");
    setMinPrice(minPriceReq ? minPriceReq : "");
    setMaxPrice(maxPriceReq ? maxPriceReq : "");
    setSize(sizeReq);
    setBrand(brandReq);
    if (sortByReq === 'increasing') {
      localStorage.setItem('selectedSort', 'По возрастанию цены')
    } else if (sortByReq === 'decreasing') {
      localStorage.setItem('selectedSort', 'По убыванию цены')
    } else {
      localStorage.setItem('selectedSort', 'Без сортировки')
    }
    if (categoryReq === "sneakers") {
      localStorage.setItem("activePay", "👟Кроссовки");
      setCategory("sneakers");
    } else {
      localStorage.setItem("activePay", "👕Одежда");
      setCategory("clothes");
    }
    const params = [
      categoryReq && `category=${categoryReq}`,
      typeReq && `type=${typeReq}`,
      sizeReq && `size=${sizeReq}`,
      brandReq && `brand=${brandReq}`,
      minPriceReq && `minPrice=${minPriceReq}`,
      maxPriceReq && `maxPrice=${maxPriceReq}`,
      pageReq && `page=${pageReq}`,
      sortByReq && `sortBy=${sortByReq}`,
    ]
      .filter(Boolean)
      .join("&");
    const request = `/products?${params}`;
    const fetchData = async () => {
      setLoading(true);
      try {
        const pageResponse = await axios.get(
          `https://poizonfamily.ru/api${request}`
        );
        const filtersResponse = await axios.get(
          "https://poizonfamily.ru/api/filters"
        );
        setOptions(filtersResponse.data);
        setProducts(pageResponse.data[1]);
        setNumOfPages(pageResponse.data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [navigate, location, isPaginate]);

  return (
    <div
      className={styles.container}
      style={
        loading || products.length < 1
          ? { justifyContent: "space-between" }
          : undefined
      }
    >
      <Header link={link} />
      {open ? (
        <BurgerMenu />
      ) : (
        <>
          <div className={styles.inform}>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className={styles.filterBlock}>
                  <Filter
                    options={options}
                    link={link}
                    setLoading={setLoading}
                  />
                  <Sorting setLoading={setLoading} link={link} />
                </div>
                {products.length > 0 ? (
                  <CardItems items={products} currentPage={currentPage} />
                ) : (
                  <h2 className={styles.error}>
                    К сожалению ничего не найдено
                  </h2>
                )}
                <Pagination
                  numOfPages={numOfPages}
                  setLoading={setLoading}
                  link={link}
                />
              </>
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};
