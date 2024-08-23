import React, { useContext } from "react";
import styles from "./NotFoundPage.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { AppContext } from "../../context/AppContext";
import { BurgerMenu } from "../../components/BurgerMenu/BurgerMenu";

export const NotFoundPage = () => {
  const { open } = useContext(AppContext);
  return (
    <div className={styles.container}>
      <Header />
      {!open ? (
        <>
          <div className={styles.inform}>
            <h1>Такой страницы не существует...</h1>
            <a href="https://poizonfamily.ru">Вернуться на главную страницу</a>
          </div>
          <Footer />
        </>
      ) : (
        <BurgerMenu />
      )}
    </div>
  );
};
