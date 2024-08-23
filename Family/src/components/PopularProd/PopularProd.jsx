import React, { useEffect } from "react";
import styles from "../../pages/HomePage/HomePage.module.css";
import { CardItems } from "../CardItems/CardItems";
import { Button } from "../Button/Button";

export const PopularProd = ({ items, category }) => {
  let name = category === 'sneakers' ? 'Самые популярные кроссовки' : 'Самая популярная одежда'
  let description = category === 'sneakers' ? 'В Poizon Family есть такие культовые модели как: Nike Air Max, Dunk, New Balance 2002r, Air Jordan, Adidas Samba, Asics Gel Kahana. Разлияные расцветки от классических до коллекционных вариантов' : 'В Poizon Family вы сможете найти одежду на любой вкус'
  return (
    <div className={styles.sneakersBlock}>
      <h2 className={styles.popTitle}>{name}</h2>
      <p>
        
      </p>
      <CardItems items={items} />
      <Button category={category}/>
    </div>
  );
};
