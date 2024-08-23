import React, { useContext, useEffect, useState } from "react";
import styles from "../CardItems.module.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { AppContext } from "../../../context/AppContext";

export const CardItem = ({ item }) => {
  const { addToCart, removeZH, toggleFavorites } = useContext(AppContext);
  const [name, setName] = useState("");
  const [inLiked, setInLiked] = useState(false);
  useEffect(() => {
    setName(removeZH(item.title));
  }, []);

  let totalPrice = Number((item.price * 1.05 * 14.3 + 2700).toFixed(0));
  useEffect(() => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const index = favorites.findIndex(
      (favItem) => favItem.productId === item.productId
    );
    if (index !== -1) {
      setInLiked(true);
    } else {
      setInLiked(false);
    }
  }, [item]);

  const handleClick = () => {
    setInLiked(!inLiked)
    toggleFavorites(item)
  }

  return (
    <div className={styles.card}>
      {inLiked ? (
        <FaHeart className={styles.like} color="red" onClick={handleClick}/>
      ) : (
        <FaRegHeart
          className={styles.like}
          onClick={handleClick}
        />
      )}
      <a href={`https://poizonfamily.ru/product/${item.productId}`}>
        <div className={styles.blockImg}>
          <img src={item.images[0]} alt="Sneakers" loading="lazy" />
        </div>
        <div style={{ textAlign: "start" }}>
          <p className={styles.price}>{totalPrice.toLocaleString('ru-RU')}₽</p>
          <p className={styles.title}>{name}</p>
        </div>
      </a>
    </div>
  );
};
