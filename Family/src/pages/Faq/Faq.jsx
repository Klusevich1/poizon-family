import React, { useContext } from "react";
import styles from "./Faq.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { AppContext } from "../../context/AppContext";
import { BurgerMenu } from "../../components/BurgerMenu/BurgerMenu";

export const Faq = () => {
  const { open } = useContext(AppContext);
  return (
    <div className={styles.container}>
      <Header />
      {open ? (
        <BurgerMenu />
      ) : (
        <>
          <div className={styles.inform}>
        <h1>Вопросы и ответы</h1>
        <div className={styles.faqBlock}>
          <h2>1. Сколько идет доставка?</h2>
          <div className={styles.infoBlock}>
            <div></div>
            <i>
              После выкупа товара, он буквально через 2-3 дня оказывается на
              складе в Китае. Далее 10-18 дней до МСК
            </i>
          </div>
          <h2>2. Как происходит оплата?</h2>
          <div className={styles.infoBlock}>
            <div></div>
            <i>
              Оплата производится переводом на карту Сбербанк или Тинькофф. Номер
              карты будет отправлен вам после согласования заказа. После
              совершения оплаты, мы выкупаем товар и скидываем вам Легит-чек
            </i>
          </div>
          <h2>3. Сколько стоят ваши услуги?</h2>
          <div className={styles.infoBlock}>
            <div></div>
            <i>
              Мы берем 1500р. за каждую единицу товара, которую вы заказвыаете,
              вне зависимости от ее стоимости. И да, если товар стоит 500р., то
              комиссия будет составлять тоже 1500р. И если ваш товар будет
              стоить 100000р., то наша комиссия также составит полторы тысячи
              рублей. И если вы закажете 3 товара, то наша комиссия составит
              4500р.
            </i>
          </div>
          <h2>4. Как правильно выбрать свой размер обуви или одежды?</h2>
          <div className={styles.infoBlock}>
            <div></div>
            <i>Посмотрите данное видео</i>
          </div>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/Du9isbCcJSc"
          ></iframe>
          <h2>5. Что если приедет не оригинальный товар?</h2>
          <div className={styles.infoBlock}>
            <div></div>
            <i>
              Эта ситуация исключена, так как товар проходит проверку в
              лаборатории Poizon и, если продавец привез к ним не оригинальный
              товар, то они возвратят деньги. Если товар от Poizon отправился к
              нам на склад, то вы гарантированно получите оригинальный товар.
            </i>
          </div>
          <h2>6. Не подошел размер, что делать?</h2>
          <div className={styles.infoBlock}>
            <div></div>
            <i>
              Обменять товар или вернуть деньги не получится. Так как
              маркетплейс Poizon не доставляет товар напрямую в Россию, то датой
              получения товара является доставка товара на наш склад в Китае, а после отправки его
              в Россию и обратно - это может занять боьше 15 дней. Поэтому мы не
              успеем обменять товар или вернуть деньги.
            </i>
          </div>
        </div>
      </div>
      <Footer />
        </>
      )}
    </div>
  );
};
