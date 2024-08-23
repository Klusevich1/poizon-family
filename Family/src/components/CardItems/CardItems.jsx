import React from "react";
import styles from "./CardItems.module.css";
import { CardItem } from "./CardItem/CardItem";

export const CardItems = ({ items, currentPage }) => {
  return (
    <div className={styles.gridProd}>
      {items.map((item, index) => (
          <CardItem key={index} item={item} currentPage={currentPage}/>
      ))}
    </div>
  );
};
