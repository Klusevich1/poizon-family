import React, { useContext } from "react";
import styles from "./Payment.module.css";
import { Header } from "../../components/Header/Header";
import { BurgerMenu } from "../../components/BurgerMenu/BurgerMenu";
import { Footer } from "../../components/Footer/Footer";
import { AppContext } from "../../context/AppContext";

export const Payment = () => {
  const { open } = useContext(AppContext);
  return (
    <div style={!open ? {justifyContent: 'space-between'} : undefined} className={styles.container}>
      <Header />
      {!open ? (
        <>
          <div className={styles.inform}>
            <h1>Оплата</h1>
            <img src="/images/payment/pay.svg" alt="" />
            <h2>Какие условия оплаты ?</h2>
            <p>
              Мы работаем по полной предоплате. Вот как выглядит сам процесс:
            </p>
            <ul>
              <li>1. Вы производите оплату</li>
              <li>2. После чего заказ отправляется на выкуп</li>
              <li>3. Далее мы присылаем Легит-чек</li>
            </ul>
            Также мы предосталвяем возможность частичной оплаты 70/30 первая
            оплата, это сам товар. Вторая оплата это доставка и комиссия нашего
            сервиса. 1500 + 1200 = 2700
          </div>
          <Footer />
        </>
      ) : (
        <BurgerMenu />
      )}
    </div>
  );
};
