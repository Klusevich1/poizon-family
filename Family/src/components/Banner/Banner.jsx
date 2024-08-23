import React, { useContext } from "react";
import styles from "../../pages/HomePage/HomePage.module.css";
import { IoSearch } from "react-icons/io5";
import { AppContext } from "../../context/AppContext";
import classNames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Banner = () => {
  const { searchBanner, setSearchBanner } = useContext(AppContext);
  const navigate = useNavigate();

  const getSearchResults = () => {
    if (searchBanner.length < 2) {
      toast.error("Введите хотя бы 2 символа", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      window.location.href = `https://poizonfamily.ru/result?search=${searchBanner}`
    }
  };

  const handleKeyDown = (event) => {
    if(event.keyCode === 13){
      getSearchResults()
    }
  };

  return (
    <div className={styles.banner}>
      <img
        className={styles.bannerBack}
        src="/images/back.png"
        alt=""
        loading="lazy"
      />
      <div className={styles.textBlock}>
        <div>
          <h1>Самый крупный магазин оригинальной обуви</h1>
          <p>Цены на 40% выгоднее, чем в любом магазине РФ</p>
        </div>
        <div className={styles.inputBlock}>
          <p className={styles.title}>Найдется любой товар</p>
          <div className={styles.searchLine}>
            <div className={styles.input}>
              <IoSearch color="black" fontSize={30} />
              <input
                type="text"
                placeholder="Введите название бренда или модели"
                value={searchBanner}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchBanner(e.target.value)}
              />
            </div>
            <button
              className={classNames(styles.searchBtn, {
                [styles.disabled]: searchBanner.length < 2,
              })}
              onClick={getSearchResults}
            >
              Поиск
            </button>
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
          <div className={styles.popReq}>
            <p className={styles.description}>Популярные запросы</p>
            <ul className={styles.listOfReq}>
              <a href="/result?search=Nike Air Max">
                <li>Nike Air Max</li>
              </a>
              <a href="/result?search=NB 1906r">
                <li>NB 1906r</li>
              </a>
              <a href="/result?search=Asics Gel-Kahana">
                <li>Asics Gel-Kahana</li>
              </a>
              <a href="/result?search=AIR JORDAN 3">
                <li>Air Jordan 3</li>
              </a>
              <a href="/result?search=Puma Smash">
                <li>Puma Smash</li>
              </a>
              <a href="/result?search=Yeezy Boost">
                <li>Yeezy Boost</li>
              </a>
              <a href="/result?search=Nike Blazer">
                <li>Nike Blazer</li>
              </a>
              <a href="/result?search=Samba">
                <li>Samba</li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
