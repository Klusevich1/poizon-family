import React, { useContext, useEffect, useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { CiHeart } from "react-icons/ci";
import styles from "./Liked.module.css";
import { CardItems } from "../../components/CardItems/CardItems";
import { AppContext } from "../../context/AppContext";
import { BurgerMenu } from "../../components/BurgerMenu/BurgerMenu";

export const Liked = () => {
  const { open } = useContext(AppContext);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // useEffect(() => {
  //   setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  // }, [favorites]);

  useEffect(() => {
    if (!localStorage.getItem('favorites')) {
      let data = []
      localStorage.setItem('favorites', JSON.stringify(data))
    } 
  }, [])

  return (
    <div style={!open ? {justifyContent: 'space-between'} : undefined} className={styles.container}>
      <Header />
      {!open ? (
        <>
          <div className={styles.inform}>
            {favorites.length < 1 ? (
              <>
                <CiHeart fontSize={300} color="#5e5e5e" />
                <p className={styles.emptyText}>
                  У вас нет отложенных товаров
                </p>
              </>
            ) : (
              <>
                <h1>Отложенные товары</h1>
                <div className={styles.favprod}>
                  <CardItems items={favorites} />
                </div>
              </>
            )}
          </div>
          <Footer />
        </>
      ) : (
        <BurgerMenu />
      )}
    </div>
  );
};
