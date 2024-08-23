import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./Form.module.css";
import { AppContext } from "../../context/AppContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { SiBetfair } from "react-icons/si";
import { FaTelegram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import emailjs from "emailjs-com";
import InputMask from "react-input-mask";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [messenger, setMessenger] = useState("");
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorProduct, setErrorProduct] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState("+7");
  const [selectedCountry, setSelectedCountry] = useState("ru");
  const { toggleBtns } = useContext(AppContext);
  const refButton1 = useRef(null);
  const refButton2 = useRef(null);
  const refOrderBlock = useRef(null);

  const cartProducts = JSON.parse(localStorage.getItem("cart"));
  let orderPrice;
  if (cartProducts && cartProducts.length > 0) {
    const prodPrices = cartProducts.map((item) => item.price * item.quantity);
    orderPrice = prodPrices.reduce((a, e) => parseInt(e) + parseInt(a));
  }
  const telRef = React.useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refButton1.current &&
        !refButton1.current.contains(event.target) &&
        refButton2.current &&
        !refButton2.current.contains(event.target) &&
        !refOrderBlock.current.contains(event.target)
      ) {
        setMessenger("");
      }
      if (telRef.current && !telRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const activeDrop = () => {
    setIsActive(!isActive);
  };

  let mask =
    selectedCountry === "ru"
      ? "(999) 999-99-99"
      : selectedCountry === "by"
      ? "(99) 999 99 99"
      : "(999) 999-99-99";

  const handleOperator = (country) => {
    if (country === "ru") {
      setSelectedCountry("ru");
      setSelectedOperator("+7");
    } else if (country === "kz") {
      setSelectedCountry("kz");
      setSelectedOperator("+7");
    } else {
      setSelectedCountry("by");
      setSelectedOperator("+375");
    }
    setIsActive(false);
  };
  const fetchData = async (event) => {
    event.preventDefault();
    setErrorFirstName(false);
    setErrorCity(false);
    setErrorPhone(false);
    let tel = selectedOperator + phone;
    console.log(tel);
    const formData = {
      firstName: firstName,
      city: city,
      phone: tel,
      messenger: messenger,
      order: cartProducts,
    };
    let errorFirstName = false;
    let errorCity = false;
    let errorPhone = false;
    let errorProduct = false;
    if (formData.firstName === "") {
      errorFirstName = true;
    }
    if (formData.city === "") {
      errorCity = true;
    }
    if (formData.phone === "") {
      errorPhone = true;
    }
    if (formData.order.length < 1) {
      errorProduct = true;
    }
    setErrorFirstName(errorFirstName);
    setErrorCity(errorCity);
    setErrorPhone(errorPhone);
    setErrorProduct(errorProduct);
    if (errorFirstName || errorCity || errorPhone || errorProduct) {
      if (errorProduct) {
        toast.error("Корзина пустая", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Заполните недостающие поля!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      try {
        const response = await axios.post(
          "https://poizonfamily.ru/api/order",
          formData
        );
        let htmlString = cartProducts
          .map(
            (item) =>
              `
            <div>
              <h4>Наименование модели: ${item.title}</h4>
              <h4>Цена: ${item.price}</h4>
              <h4>Размер: ${item.size}</h4>
              <h4>Количество: ${item.quantity}</h4>
              <h4>Ссылка: ${item.url}</h4>
            </div>
          `
          )
          .join("");
        let templateParams = {
          firstName: firstName,
          city: city,
          phone: tel,
          messenger: messenger,
          htmlContent: htmlString,
        };
        if (response.status === 200) {
          emailjs
            .send(
              "service_0q32i5h",
              "template_liaobqi",
              templateParams,
              "CpyxrF5P198qBlUfn"
            )
            .then(
              function (response) {
                console.log("SUCCESS!", response.status, response.text);
              },
              function (error) {
                console.log("FAILED...", error);
              }
            );
          setFirstName("");
          setCity("");
          setPhone("");
          setMessenger("");
          localStorage.setItem("cart", JSON.stringify([]));
          toast.success("Ваша заявка отправлена!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          console.log("Форма успешно отправлена");
        } else {
          console.error("Ошибка при отправке формы:", response);
        }
      } catch (error) {
        console.error("Ошибка при отправке формы:", error);
      }
    }
  };
  return (
    <div className={styles.formBlock}>
      <div className={styles.customerInfo}>
        <h1>Ваши данные</h1>
        <form className={styles.form} aria-autocomplete="off">
          <p>
            Имя<span style={{ color: "red" }}>*</span>
          </p>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={classNames(styles.inputField, {
              [styles.errorInput]: errorFirstName,
            })}
          />
          {errorFirstName && (
            <span className={styles.error}>Это поле обязательное!</span>
          )}
          <p>
            Город<span style={{ color: "red" }}>*</span>
          </p>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={classNames(styles.inputField, {
              [styles.errorInput]: errorCity,
            })}
          />
          {errorCity && (
            <span className={styles.error}>Это поле обязательное!</span>
          )}
          <p>
            Телефон<span style={{ color: "red" }}>*</span>
          </p>
          <div className={styles.operatorBlock}>
            <div
              ref={telRef}
              className={styles.selectedOperator}
              onClick={activeDrop}
            >
              {selectedCountry === "ru" ? (
                <img src="/images/flags/ru.svg" alt="" />
              ) : selectedCountry === "kz" ? (
                <img src="/images/flags/kz.svg" alt="" />
              ) : (
                <img src="/images/flags/by.svg" alt="" />
              )}
              {selectedOperator}
            </div>
            {isActive && (
              <div className={styles.options}>
                <div onClick={() => handleOperator("ru")}>
                  <img src="/images/flags/ru.svg" alt="" />
                  <p>+7</p>
                </div>
                <div onClick={() => handleOperator("by")}>
                  <img src="/images/flags/by.svg" alt="" />
                  <p>+375</p>
                </div>
                <div onClick={() => handleOperator("kz")}>
                  <img src="/images/flags/kz.svg" alt="" />
                  <p>+7</p>
                </div>
              </div>
            )}
            <InputMask
              mask={mask}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  className={classNames(styles.inputField, {
                    [styles.errorInput]: errorPhone,
                  })}
                />
              )}
            </InputMask>
          </div>
          {errorPhone && (
            <span className={styles.error}>Это поле обязательное!</span>
          )}
        </form>
        <div className={styles.messengerBlock}>
          <p>Мессенджер для связи</p>
          <span>(выбрать)</span>
          <div className={styles.messengers}>
            <div
              className={styles.btn}
              style={
                messenger === "telegram"
                  ? { backgroundColor: "#27a7e7" }
                  : undefined
              }
              ref={refButton1}
              onClick={() => setMessenger("telegram")}
            >
              <FaTelegram
                style={
                  messenger === "telegram"
                    ? { color: "#ededed" }
                    : { color: "#27a7e7" }
                }
                className={styles.iconMes}
              />
              <span>Telegram</span>
            </div>
            <div
              className={styles.btn}
              style={
                messenger === "whatsapp"
                  ? { backgroundColor: "#43d854" }
                  : undefined
              }
              ref={refButton2}
              onClick={() => setMessenger("whatsapp")}
            >
              <IoLogoWhatsapp
                style={
                  messenger === "whatsapp"
                    ? { color: "#ededed" }
                    : { color: "#43d854" }
                }
                className={styles.iconMes}
              />
              <span>WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.orderBlock}>
        <div className={styles.orderField} ref={refOrderBlock}>
          <h1 style={{ margin: "0" }}>Ваш заказ</h1>
          {cartProducts.map((item) => (
            <div className={styles.order}>
              <div className={styles.prodText}>
                <p className={styles.orderTitle}>{item.title}</p>
                <p className={styles.orderDesc}>
                  Размер: <span className={styles.orderTitle}>{item.size}</span>
                </p>
                <div className={styles.quantityBtns}>
                  <button onClick={() => toggleBtns(item, "minus")}>-</button>
                  <p>{item.quantity}</p>
                  <button onClick={() => toggleBtns(item, "plus")}>+</button>
                </div>
              </div>
              <p>{item.price * item.quantity} ₽</p>
            </div>
          ))}
          {cartProducts.length < 1 && <p>Ваша корзина пуста</p>}
          <div className={styles.resPrice}>
            <p className={styles.text}>Итого</p>
            <p className={styles.priceText}>
              {cartProducts.length < 1 ? "0" : orderPrice} ₽
            </p>
          </div>
          <div className={styles.policy}>
            <p>
              Ваши персональные данные будут использованы для обработки вашего
              заказа, поддержки вашего взаимодействия в соответствии с нашей{" "}
              <a href="https://poizonfamily.ru/cart">
                <span>политика конфиденциальности</span>
              </a>
              .
            </p>
          </div>
          <div className={styles.orderButton}>
            <button
              className={classNames(styles.btnSubmit, {
                [styles.disabled]: cartProducts.length < 1,
              })}
              // disabled={cartProducts.length < 1}
              onClick={fetchData}
            >
              Подтвердить заказ
            </button>
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
