import React from "react";
import styles from "../../pages/HomePage/HomePage.module.css";

export const About = () => {
  return (
    <div className={styles.about}>
      <iframe
        className={styles.video}
        src="https://www.youtube.com/embed/aZ9qJqMzdFc"
      ></iframe>
      <div className={styles.aboutText}>
        <h2>Какие услуги мы предоставляем?</h2>
        <div className={styles.line}></div>
        <p>Помощь в доставке и выкупе вещей с платформы Poizon</p>
        <p>
          Мы берем на себя всю заботу о вашем стиле! Помогаем в доставке и
          выкупе ваших находок с платформы Poizon, гарантируя, что каждая вещь
          быстро и безопасно попадет в ваш гардероб. Наслаждайтесь шопингом, а
          остальное - наша забота!
        </p>
      </div>
    </div>
  );
};
