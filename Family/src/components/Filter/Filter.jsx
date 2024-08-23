import React, { useContext, useEffect, useState } from "react";
import styles from "./Filter.module.css";
import classNames from "classnames";
import { DropDown } from "../DropDown/DropDown";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Filter = ({ options, link, setLoading }) => {
  const [activePay, setActivePay] = useState(
    localStorage.getItem("activePay") || "👟Кроссовки"
  );
  const {
    category,
    setCategory,
    setType,
    setSize,
    setBrand,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    isFiltered,
    setIsFiltered,
    setCurrentPage,
  } = useContext(AppContext);

  const paySort = (text) => {
    localStorage.setItem("currentPage", 1);
    setCurrentPage(1);
    resetFilters();
    if (text === "👟Кроссовки") {
      setActivePay("👟Кроссовки");
      localStorage.setItem("activePay", "👟Кроссовки");
      setCategory("sneakers");
    } else {
      setActivePay("👕Одежда");
      localStorage.setItem("activePay", "👕Одежда");
      setCategory("clothes");
    }
  };

  const resetFilters = () => {
    localStorage.setItem("selectedSize", "Любой размер");
    localStorage.setItem("selectedBrand", "Любой бренд");
    localStorage.setItem("selectedType", "Любой тип");
    setSize("");
    setBrand("");
    setType("");
    setMinPrice("");
    setMaxPrice("");
  };

  const reset = () => {
    setLoading(true)
    if (activePay === "👟Кроссовки") {
      setCategory("sneakers");
    } else {
      setCategory("clothes");
    }
    resetFilters();
  };

  return (
    <div className={styles.container}>
      <div className={styles.availability}>
        <p className={styles.par}>Категория</p>
        <div className={styles.btnBlock}>
          <Link to={"https://poizonfamily.ru/products?category=sneakers&page=1"}>
            <button
              onClick={(e) => paySort(e.target.textContent)}
              className={classNames(styles.btn, {
                [styles.activeBtn]: activePay === "👟Кроссовки",
              })}
            >
              👟Обувь
            </button>
          </Link>
          <Link to={"https://poizonfamily.ru/products?category=clothes&page=1"}>
            <button
              onClick={(e) => paySort(e.target.textContent)}
              className={classNames(styles.btn, {
                [styles.activeBtn]: activePay === "👕Одежда",
              })}
            >
              👕Одежда
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.adaptiveBlockUp}>
        {options.map((option, index) => {
          if (
            localStorage.getItem("activePay") === "👟Кроссовки" &&
            (option.title === "Размер" || option.title === "Бренд")
          ) {
            return (
              <div key={index} className={styles.dropBlock}>
                <DropDown
                  option={option}
                  setSize={setSize}
                  setBrand={setBrand}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  isFiltered={isFiltered}
                  setIsFiltered={setIsFiltered}
                  setCategory={setCategory}
                  activePay={activePay}
                />
              </div>
            );
          } else if (
            localStorage.getItem("activePay") === "👕Одежда" &&
            (option.title === "Тип одежды" || option.title === "Бренд")
          ) {
            return (
              <div key={index} className={styles.dropBlock}>
                <DropDown
                  option={option}
                  setType={setType}
                  setBrand={setBrand}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  isFiltered={isFiltered}
                  setIsFiltered={setIsFiltered}
                  setCategory={setCategory}
                  activePay={activePay}
                />
              </div>
            );
          }
        })}
      </div>
      <div className={styles.adaptiveBlockDown}>
        <div className={styles.price}>
          <p className={styles.par}>Цена, RUB</p>
          <div className={styles.inputsBlock}>
            <input
              category="text"
              placeholder="от"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              category="text"
              placeholder="до"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.submitBtns}>
          <Link to={`https://poizonfamily.ru/products?category=${category}&page=1`}>
            <button
              style={{ backgroundColor: "rgb(189, 189, 189)" }}
              onClick={reset}
            >
              Сброс фильтров
            </button>
          </Link>
          <Link to={`https://poizonfamily.ru${link}&page=1`}>
            <button
              style={{ backgroundColor: "rgb(0,191,193)" }}
              onClick={() => setIsFiltered(true)}
            >
              Применить
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
