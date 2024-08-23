import React, { useContext } from "react";
import { BurgerMenu } from "../../components/BurgerMenu/BurgerMenu";
import { Header } from "../../components/Header/Header";
import { AppContext } from "../../context/AppContext";
import { Form } from "../../components/Form/Form";
import styles from "./Order.module.css";
import { Footer } from "../../components/Footer/Footer";

export const Order = () => {
  const { open } = useContext(AppContext);
  return (
    <div className={styles.container}>
      <Header />
      {!open ? (
        <>
          <div className={styles.cartBlock}>
            <Form />
          </div>
          <Footer />
        </>
      ) : (
        <BurgerMenu />
      )}
    </div>
  );
};
