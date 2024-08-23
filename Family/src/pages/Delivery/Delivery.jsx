import React, { useContext } from "react";
import { Header } from "../../components/Header/Header";
import styles from "./Delivery.module.css";
import { Footer } from "../../components/Footer/Footer";
import { AppContext } from "../../context/AppContext";
import { BurgerMenu } from "../../components/BurgerMenu/BurgerMenu";

export const Delivery = () => {
  const { open } = useContext(AppContext);
  return (
    <div className={styles.container}>
      <Header />
      {open ? (
        <BurgerMenu />
      ) : (
        <>
          <div className={styles.inform}>
            <h1>Доставка и возврат</h1>
            <div className={styles.infoBlock}>
              <div></div>
              <i>
                Доставка до склада в Китае 2-3 дня (бывают товары,которые идут
                дольше) Далее от 10 до 18 дней до МСК
              </i>
            </div>
            <p>Цены доставки по РФ:</p>
            <ul>
              <li>
                СДЭК: только после получения в РФ цена будет известна(зависит от
                размеров посылки)
              </li>
            </ul>
            <p>Данные для отправки. Почта РФ:</p>
            <ul>
              <li>Полный адрес (получение)</li>
              <li>ФИО</li>
              <li>Номер телефона</li>
              <li>Индекс</li>
            </ul>
            <p>СДЭК:</p>
            <ul>
              <li>Полный адрес отделения СДЭК (получение)</li>
              <li>ФИО</li>
              <li>Номер телефона</li>
              <li>Индекс</li>
            </ul>
            <h2>Есть ли у нас возврат?</h2>
            <p>
              К сожалению, у нас нет возвратов, однако, если вам не подойдет
              размер, мы поможем вам перепродать вещь, выставив ее на нашем
              сайте и в нашем Telegram-канале.
            </p>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};
