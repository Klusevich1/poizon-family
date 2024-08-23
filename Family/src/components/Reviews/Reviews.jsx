import React from "react";
import styles from "./Reviews.module.css";

export const Reviews = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Отзывы довольных покупателей</h2>
      <div className={styles.rewBlock}>
        <div className={styles.lineBlock}>
          <img className={styles.img} src="/images/reviews/22.png" alt="" />
          <div className={styles.middlePart}>
            <img className={styles.img} src="/images/reviews/33.png" alt="" />
            <img className={styles.img} src="/images/reviews/55.png" alt="" />
          </div>
          <img className={styles.img} src="/images/reviews/99.png" alt="" />
        </div>
        <div className={styles.lineBlock}>
          <img className={styles.img} src="/images/reviews/77.png" alt="" />
          <div className={styles.middlePart}>
            <img className={styles.img} src="/images/reviews/1414.png" alt="" />
            <img className={styles.img} src="/images/reviews/88.png" alt="" />
          </div>
          <img className={styles.img} src="/images/reviews/1313.png" alt="" />
        </div>
        <div className={styles.lineBlock}>
          <img className={styles.img} src="/images/reviews/66.png" alt="" />
          <img className={styles.img} src="/images/reviews/11.png" alt="" />
          <img className={styles.img} src="/images/reviews/1212.png" alt="" />
        </div>
      </div>
    </div>
  );
};
