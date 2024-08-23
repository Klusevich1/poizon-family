import React from "react";
import styles from "./Footer.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";

export const Footer = () => {
  return (
    <div className={styles.footWrap}>
      <div>
        <img src="/images/logo.svg" width={200} alt="" />
      </div>
      <div className={styles.footNav}>
        <a href="https://poizonfamily.ru/products?category=sneakers&page=1">КАТАЛОГ</a>
        <a href="https://poizonfamily.ru/about">О POIZON</a>
        <a href="https://poizonfamily.ru/delivery">ДОСТАВКА И ВОЗВРАТ</a>
        <a href="https://poizonfamily.ru/payment">ОПЛАТА</a>
        <a href="https://poizonfamily.ru/questions">FAQ</a>
        <a href="https://poizonfamily.ru/contacts">КОНТАКТЫ</a>
      </div>
      <div className={styles.navLinks}>
        <a href="https://t.me/poizinfamily" target="_blank">
          <PiTelegramLogo className={styles.icon} />
        </a>
        <a href="https://wa.me/+375296342190" target="_blank">
          <FaWhatsapp className={styles.icon} />
        </a>
        <a
          href="https://www.instagram.com/poizon.family/?hl=ru"
          target="_blank"
        >
          <FaInstagram className={styles.icon} />
        </a>
      </div>
      <div className={styles.line}></div>
      <div className={styles.phone}>
        <span className={styles.spanPhone}>+79362839903</span>
      </div>
      <div className={styles.jurInfo}>
        {/* <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span>ИП ШВЕД ЕГОР С</span>
          <span>ИНН 6679 0042 3817</span>
        </div> */}
        <a href="#">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
        <a href="#">УСЛОВИЯ ДОГОВОРА ОФЕРТЫ</a>
      </div>
      <div className={styles.rights}>
        <span>© 2024 POIZONFAMILY. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</span>
      </div>
    </div>
  );
};
