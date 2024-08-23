import React, { useState } from "react";
import styles from "./InfoCards.module.css";
import { Modal } from "../Modal/Modal";
import classNames from "classnames";

export const InfoCards = () => {
  const [open, setOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState();

  const toggleModal = (card) => {
    setCardOpen(card);
    setOpen(true);
  };

  const handleModalClick = () => {
    setOpen(!open);
  };
  console.log(open);

  return (
    <div className={styles.infoCont}>
      <div className={styles.wrapper}>
        <div
          style={{
            background:
              "rgb(0,227,228) linear-gradient(90deg, rgba(0,227,228,1) 0%, rgba(0,191,193,1) 50%)",
          }}
          className={styles.card}
          onClick={() => toggleModal(1)}
        >
          <p>Что такое Poizon?</p>
          <img className={styles.imgInfo} src="/images/box.png" alt="Box" />
        </div>
        <div
          style={{
            background:
              "rgb(59,59,59) linear-gradient(90deg, rgba(59,59,59,1) 0%, rgba(99,99,99,1) 59%)",
          }}
          className={styles.card}
          onClick={() => toggleModal(2)}
        >
          <p>Твоя команда Poizon Family</p>
          <img
            className={styles.imgInfo}
            src="/images/info/family.png"
            alt="Box"
          />
        </div>
        <div
          style={{
            background:
              "rgb(183,217,255) linear-gradient(90deg, rgba(109,178,255,1) 0%, rgba(0,81,193,1) 50%)",
          }}
          className={styles.card}
          onClick={() => toggleModal(3)}
        >
          <p>Как работает доставка?</p>
          <img
            className={styles.imgInfo}
            src="/images/info/delivery.png"
            alt="Box"
          />
        </div>
        <div
          style={{
            background:
              "rgb(205,231,253) linear-gradient(90deg, rgba(205,231,253,1) 0%, rgba(62,166,255,1) 59%)",
          }}
          className={styles.card}
          onClick={() => toggleModal(4)}
        >
          <p>Часто задаваемые вопросы</p>
          <img
            className={styles.imgInfo}
            src="/images/info/faq.png"
            alt="Box"
          />
        </div>
        <div
          style={{
            background: "#fff",
          }}
          className={styles.card}
          onClick={() => toggleModal(5)}
        >
          <p style={{ color: "black" }}>Как выбрать размер?</p>
          <img
            className={styles.imgInfo}
            src="/images/info/size.png"
            alt="Box"
          />
        </div>
        <div
          style={{
            background:
              "rgb(176,176,176) linear-gradient(90deg, rgba(176,176,176,1) 0%, rgba(255,62,62,1) 59%)",
          }}
          className={styles.card}
          onClick={() => toggleModal(6)}
        >
          <p>Что у нас продается?</p>
          <img
            className={styles.imgInfo}
            src="/images/info/catalog.png"
            alt="Box"
          />
        </div>
      </div>
      <div
        className={classNames(styles.overlay, { [styles.active]: open })}
        onClick={handleModalClick}
      ></div>
      <Modal
        open={open}
        setOpen={setOpen}
        cardOpen={cardOpen}
        title="Что такое Poizon?"
        text=""
      />
    </div>
  );
};
