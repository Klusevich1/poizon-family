import React, { useContext } from "react";
import styles from "./BurgerMenu.module.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export const BurgerMenu = () => {
  const burgerClick = () => {
    localStorage.setItem("activePay", "👟Кроссовки");
    localStorage.setItem("currentPage", 1);
  };
  return (
    <div className={styles.menu}>
      <div className={styles.menuGroup}>
        <p>Категории</p>
        <ul>
          <li>
            <a
              href="https://poizonfamily.ru/products?category=sneakers&page=1"
              onClick={burgerClick}
            >
              Обувь
            </a>
          </li>
          <li>
            <a href="https://poizonfamily.ru/products?category=clothes&page=1">Одежда</a>
          </li>
        </ul>
      </div>
      <div className={styles.menuGroup}>
        <p>Популярные бренды</p>
        <ul>
          <li>
            <a href="https://poizonfamily.ru/products?category=sneakers&brand=Adidas&page=1">
              Adidas
            </a>
          </li>
          <li>
            <a href="https://poizonfamily.ru/products?category=sneakers&brand=Asics&page=1">
              Asics
            </a>
          </li>
          <li>
            <a href="https://poizonfamily.ru/products?category=sneakers&brand=Jordan&page=1">
              Jordan
            </a>
          </li>
          <li>
            <a href="https://poizonfamily.ru/products?category=sneakers&brand=Puma&page=1">
              Puma
            </a>
          </li>
          <li>
            <a href="https://poizonfamily.ru/products?category=sneakers&brand=New Balance&page=1">
              New Balance
            </a>
          </li>
          <li>
            <a href="https://poizonfamily.ru/products?category=sneakers&brand=Nike&page=1">
              Nike
            </a>
          </li>
          <li>
            <a href="https://poizonfamily.ru/products?category=sneakers&brand=Vans&page=1">
              Vans
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.menuGroup}>
        <p>Покупателям</p>
        <ul>
          <li><a href="https://poizonfamily.ru/about">О Poizon и о команде Poizon Family</a></li>
          <li><a href="https://poizonfamily.ru/payment">Оплата</a></li>
          <li><a href="https://poizonfamily.ru/delivery">Доставка и возврат</a></li>
          <li><a href="https://poizonfamily.ru/questions">Часто задаваемые вопросы</a></li>
          <li><a href="https://poizonfamily.ru/contacts">Контакты</a></li>
          <li><a href="https://t.me/manager_poizonBY">Помощь</a></li>
        </ul>
      </div>
    </div>
  );
};
