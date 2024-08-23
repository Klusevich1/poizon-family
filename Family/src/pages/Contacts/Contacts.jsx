import React, { useContext } from "react";
import { Header } from "../../components/Header/Header";
import styles from "./Contacts.module.css";
import { Footer } from "../../components/Footer/Footer";
import { IoMail } from "react-icons/io5";
import { FaSquarePhone } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { AppContext } from "../../context/AppContext";
import { BurgerMenu } from "../../components/BurgerMenu/BurgerMenu";

export const Contacts = () => {
  const { open } = useContext(AppContext);
  return (
    <div style={!open ? {justifyContent: 'space-between'} : undefined} className={styles.container}>
      <Header />
      {!open ? (
        <>
          <div className={styles.inform}>
            <h1>Контакты</h1>
            <div className={styles.infoLine}>
              <FaSquarePhone fontSize={30} />
              <p>+79362839903</p>
            </div>
            <div className={styles.infoLine}>
              <IoMail fontSize={30} />
              <p>poizonfamily.ru@gmail.com</p>
            </div>
            <div className={styles.infoLine}>
              <FaWhatsappSquare fontSize={30} />
              <p>https://wa.me/+79362839903</p>
            </div>
            <div className={styles.infoLine}>
              <FaTelegram fontSize={30} />
              <p>
                Telegram-канал:{" "}
                <a href="https://t.me/poizinfamily" target="_blank">
                  https://t.me/poizinfamily
                </a>
              </p>
            </div>
            <div className={styles.infoLine}>
              <RiRobot2Fill fontSize={30} />
              <p>
                Telegram-бот:{" "}
                <a href="https://t.me/Poizzoncash_bot" target="_blank">
                  https://t.me/Poizzoncash_bot
                </a>
              </p>
            </div>
            <p>
              По всем возникшим вопросам связываться с нашим менеджером{" "}
              <a href="https://t.me/manager_poizonBY" target="_blank">
                https://t.me/manager_poizonBY
              </a>
            </p>
          </div>
          <Footer />
        </>
      ) : (
        <BurgerMenu />
      )}
    </div>
  );
};
