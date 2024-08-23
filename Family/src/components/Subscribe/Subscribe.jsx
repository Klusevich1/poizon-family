import React from "react";
import styles from "./Subscribe.module.css";

export const Subscribe = () => {
  return (
    <div className={styles.wrapBack}>
      <div className={styles.wrapper}>
        <div className={styles.tg}>
          <div className={styles.imgBlock}>
            <img src="/images/subscribe/1.jpg" alt="Bot" />
          </div>
          <div className={styles.info}>
            <h3>Зачем нужен бот?</h3>
            <p>Поможет высчитать стоимость товара и связаться с менеджером</p>
            <a href="https://t.me/Poizzoncash_bot" target="_blank"><button className={styles.btn}>Перейти в бота</button></a>
          </div>
        </div>
        <div className={styles.tg}>
          <div className={styles.logoBlock}>
            <img src="/images/subscribe/logo.jpg" alt="Channel" />
            <img
              src="/images/subscribe/tg.png"
              alt="Telegram"
            />
          </div>
          <div className={styles.info}>
            <h3>Что можно найти на канале?</h3>
            <p>Увидите новости с мира моды, выкупы товаров, подборки</p>
            <a href="https://t.me/poizinfamily" target="_blank"><button className={styles.btn}>Перейти на канал</button></a>
          </div>
        </div>
      </div>
    </div>
  );
};
