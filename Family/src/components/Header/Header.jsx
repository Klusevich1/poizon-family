import React, { useContext, useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import styles from "../../pages/HomePage/HomePage.module.css";
import { AppContext } from "../../context/AppContext";
import classNames from "classnames";

export const Header = () => {
  const {
    link,
    handleClick,
    open,
    openSearch,
    handleSearchClick,
    search,
    setSearch,
  } = useContext(AppContext);
  const [errorInput, setErrorInput] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      let data = [];
      localStorage.setItem("cart", JSON.stringify(data));
    }
  }, []);
  let count = JSON.parse(localStorage.getItem("cart"))?.length || 0;

  const getSearchResults = () => {
    if (search.length < 2) {
      setErrorInput(true)
    } else {
      window.location.href = `https://poizonfamily.ru/result?search=${search}`;
    }
  };

  const getOnChangeResults = (e) => {
    setSearch(e.target.value)
    if (search.length < 1) {
      setErrorInput(true)
    } else {
      setErrorInput(false)
    }
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      getSearchResults();
    }
  };

  return (
    <header className={styles.header}>
      <div
        className={classNames(styles.searchBlock, {
          [styles.show]: openSearch,
        })}
      >
        <div className={styles.searchWrapper}>
          <p>Поиск</p>
          <div className={styles.searchInput}>
            <input
              type="text"
              spellCheck="false"
              value={search}
              onKeyDown={handleKeyDown}
              onChange={(e) => getOnChangeResults(e)}
            />
            <FiSearch
              color="#7a7a7a"
              fontSize={40}
              onClick={getSearchResults}
            />
          </div>
          {errorInput && (
            <span style={{ color: "red" }}>Введите хотя бы два символа</span>
          )}
        </div>
      </div>
      {openSearch && (
        <div
          className={classNames(styles.overlay, styles.active)}
          onClick={handleSearchClick}
        ></div>
      )}
      <div className={styles.headerBlock}>
        <div className={styles.iconsGroup}>
          {open ? (
            <IoCloseOutline className={styles.icon} onClick={handleClick} />
          ) : (
            <IoMenu className={styles.icon} onClick={handleClick} />
          )}
          <FiSearch
            className={classNames(styles.icon, styles.searchButton)}
            onClick={handleSearchClick}
          />
        </div>
        <div className={styles.logoBlock}>
          <a href="https://poizonfamily.ru">
            <img src="/images/logo.svg" width={200} alt="Logo" />
          </a>
        </div>
        <div className={styles.iconsGroup}>
          <div>
            <a href="https://poizonfamily.ru/liked">
              <FiHeart className={styles.icon} />
            </a>
          </div>
          <a href="https://poizonfamily.ru/cart">
            <div className={styles.heart}>
              <BsCart2 className={styles.icon} />
              <div className={styles.counter}>{count}</div>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};
