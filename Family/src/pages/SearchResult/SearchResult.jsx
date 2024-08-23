import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { BurgerMenu } from "../../components/BurgerMenu/BurgerMenu";
import { Loading } from "../../components/Loading/Loading";
import axios from "axios";
import styles from "./SearchResult.module.css";
import { AppContext } from "../../context/AppContext";
import { CardItems } from "../../components/CardItems/CardItems";
import { Footer } from "../../components/Footer/Footer";

export const SearchResult = () => {
  const { link, open } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const queryParams = new URLSearchParams(location.search);
  const searchReq = queryParams.get("search");
  useEffect(() => {
    setProducts([]);
    const fetchData = async () => {
      setLoading(true);
      try {
        const searchResponse = await axios.get(
          `https://poizonfamily.ru/api/result?search=${searchReq}`
        );
        setProducts(searchResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [location, navigate]);
  return (
    <div style={!open ? {justifyContent: 'space-between'} : undefined} className={styles.container}>
      <Header link={link} />
      {open ? (
        <BurgerMenu />
      ) : (
        <>
          <div className={styles.inform}>
            <div className={styles.titleBlock}>
              <p className={styles.searchTitle}>
                РЕЗУЛЬТАТЫ ПОИСКА: {searchReq.toUpperCase()}
              </p>
              <div className={styles.line}></div>
            </div>
            {loading ? (
              <Loading />
            ) : (
              searchReq.length > 1 ? (
                <>{products.length > 0 ? <CardItems items={products} /> : <h3>Нету товаров с таким названием. Проверьте строку поиска</h3>}</>
              ) : (
                <h3>Введите в поисковую строку хотя бы 2 символа</h3>
              )
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};
