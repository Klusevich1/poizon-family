import React, { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { AppContext } from "../../context/AppContext";
import { BurgerMenu } from "../../components/BurgerMenu/BurgerMenu";
import { useParams } from "react-router-dom";
import { PiWarningCircle } from "react-icons/pi";
import { BsTruck } from "react-icons/bs";
import { GoShieldCheck } from "react-icons/go";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import Slider from "react-slick";
import styles from "./Product.module.css";
import axios from "axios";
import classNames from "classnames";
import { Footer } from "../../components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "../../components/Loading/Loading";
import { IoClose } from "react-icons/io5";

export const Product = () => {
  const { open, removeZH, addToCart, inCart, setInCart } =
    useContext(AppContext);
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [priceProd, setPriceProd] = useState([]);
  const [name, setName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSize, setActiveSize] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [sizes, setSizes] = useState([]);

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          {product[0] && (
            <img className={styles.image} src={product[0].images[i]} />
          )}
        </a>
      );
    },
    arrows: false,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    setActiveSize(localStorage.getItem("selectedSize"));
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://poizonfamily.ru/api/${productId}`
        );
        setProduct(response.data);
        setName(removeZH(response.data[0] && response.data[0].title));
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    if (product) {
      handleSize(localStorage.getItem("selectedSize"));
    }
    const getSize = () => {
      let tempSizes = [];
      product.map((item, index) => {
        if (item.productId !== item.variantId) {
          tempSizes.push(item.size);
        }
      });
      tempSizes.sort((a, b) => a - b);
      setSizes(tempSizes); // Обновляем состояние sizes
    };
    getSize();
  }, [product]);

  const handleSize = (size) => {
    setActiveSize(size);
    let test = [];
    test = product.filter((obj) => {
      return obj.size === size;
    });
    setPriceProd(test);
  };

  const cartAndNotify = () => {
    if (!activeSize) {
      toast.info("Выберите размер!", {
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
      priceProd[0] && addToCart(priceProd, activeSize);
      toast.success("Перейти в корзину", {
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
  };

  const handleModalClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.container}>
      <Header />
      {!open ? (
        <div className={styles.inform}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className={styles.prodInfo}>
                <div className={styles.sliderContainer}>
                  <Slider {...settings} className="sliderprod">
                    {product[0] &&
                      product[0].images.map((prod, index) => (
                        <div>
                          <img src={prod} loading="lazy" />
                        </div>
                      ))}
                  </Slider>
                </div>
                <div className={styles.textBlock}>
                  <h1 style={{ margin: "0", marginTop: "20px" }}>{name}</h1>
                  {priceProd[0] ? (
                    <p className={styles.price}>
                      {priceProd[0] &&
                        Number(
                          (priceProd[0].price * 1.05 * 14.3 + 2700).toFixed(0)
                        ).toLocaleString("ru-RU")}
                      ₽
                    </p>
                  ) : (
                    <p className={styles.price}>
                      {product[0] &&
                        Number(
                          (product[0].price * 1.05 * 14.3 + 2700).toFixed(0)
                        ).toLocaleString("ru-RU")}
                      ₽
                    </p>
                  )}
                  <div className={styles.description}></div>
                  <div className={styles.sizeBlock}>
                    <p className={styles.paragraph}>Выберите размер (EU)</p>
                    <div className={styles.sizeLine}>
                      {product ? (
                        sizes.map((size) => (
                          <div
                            className={activeSize === size ? styles.active : ""}
                            onClick={() => handleSize(size)}
                          >
                            {size}
                          </div>
                        ))
                      ) : (
                        <p style={{ margin: "0" }}>
                          Размер уточяйте у менеджера
                        </p>
                      )}
                    </div>
                    <p
                      className={styles.tableP}
                      onClick={() => setIsActive(true)}
                    >
                      Таблица размеров
                    </p>
                    <div
                      className={classNames(styles.overlay, {
                        [styles.active]: isActive,
                      })}
                      onClick={handleModalClick}
                    ></div>
                    <div
                      className={classNames(styles.sizeTable, {
                        [styles.active]: isActive,
                      })}
                    >
                      <div className={styles.tableTitle}>
                        <p>Таблица размеров</p>
                        <IoClose
                          onClick={() => setIsActive(false)}
                          color="#727272"
                          fontSize={35}
                          cursor={"pointer"}
                        />
                      </div>
                      <div className={styles.tableBlock}>
                        <div className={styles.table}>
                          <div className={styles.tableLine}>
                            <div>EU</div>
                            <div>US</div>
                            <div>UK</div>
                            <div>RU</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>35.5</div>
                            <div>5</div>
                            <div>2.5</div>
                            <div>34.5</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>36</div>
                            <div>5.5</div>
                            <div>3</div>
                            <div>35</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>36.5</div>
                            <div>6</div>
                            <div>3.5</div>
                            <div>35.5</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>37.5</div>
                            <div>6.5</div>
                            <div>4</div>
                            <div>36.5</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>38</div>
                            <div>7</div>
                            <div>4.5</div>
                            <div>37</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>38.5</div>
                            <div>7.5</div>
                            <div>5</div>
                            <div>37.5</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>39</div>
                            <div>8</div>
                            <div>5.5</div>
                            <div>38</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>40</div>
                            <div>8.5</div>
                            <div>6</div>
                            <div>39</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>40.5</div>
                            <div>9</div>
                            <div>6.5</div>
                            <div>39.5</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>41</div>
                            <div>9.5</div>
                            <div>7</div>
                            <div>40</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>42</div>
                            <div>10</div>
                            <div>7.5</div>
                            <div>41</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>42.5</div>
                            <div>10.5</div>
                            <div>8</div>
                            <div>41.5</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>43</div>
                            <div>11</div>
                            <div>8.5</div>
                            <div>42</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>44</div>
                            <div>11.5</div>
                            <div>9</div>
                            <div>43</div>
                          </div>
                          <div className={styles.tableLine}>
                            <div className={styles.eu}>44.5</div>
                            <div>12</div>
                            <div>9.5</div>
                            <div>43.5</div>
                          </div>
                        </div>
                        <div className={styles.sizeInfo}>
                          <h3>Как определить размер</h3>
                          <p>
                            Поставьте ногу на&nbsp;чистый лист бумаги. Измерьте
                            расстояние от&nbsp;основания пятки до&nbsp;крайней
                            точки самого длинного пальца. Измерьте обе стопы
                            и&nbsp;используйте наибольшее значение для
                            определения размера. Стелька длиннее стопы
                            на&nbsp;величину функционального припуска
                            0,5–1,5&nbsp;см. При выборе размера ориентируйтесь
                            на&nbsp;длину стопы.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.deliveryBlock}>
                    <p className={styles.paragraph}>Доставка</p>
                    <div className={styles.duration}>
                      <p className={styles.durTitle}>15-25 ДНЕЙ</p>
                      <p className={styles.durSubtitle}>
                        ПРИВЕЗЁМ В РОССИЮ ЗА 15-25 ДНЕЙ И ОТДАДИМ СО СКЛАДА В
                        МОСКВЕ ИЛИ ОТПРАВИМ СДЭКОМ
                      </p>
                    </div>
                  </div>
                  <div className={styles.cartBlock}>
                    <p className={styles.priceBlock}>
                      Рассчётная стоимость:
                      {priceProd[0] ? (
                        <p className={styles.price}>
                          {priceProd[0] &&
                            (priceProd[0].price * 1.05 * 14.3 + 2700).toFixed(
                              0
                            )}
                          ₽
                        </p>
                      ) : (
                        <p className={styles.price}>
                          {product[0] &&
                            (product[0].price * 1.05 * 14.3 + 2700).toFixed(0)}
                          ₽
                        </p>
                      )}
                      <span className={styles.price}></span>
                    </p>
                    <button
                      className={classNames(styles.priceBtn, {
                        [styles.disabled]: !activeSize,
                      })}
                      onClick={cartAndNotify}
                    >
                      Добавить в корзину
                    </button>
                    <a href="https://poizonfamily.ru/cart">
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
                    </a>
                  </div>
                  <div className={styles.infoBlock}>
                    <div className={styles.infoLine}>
                      <div className={styles.iconBlock}>
                        <PiWarningCircle className={styles.infoIcon} />
                      </div>
                      <p>
                        ПРИ ЗАКАЗЕ ЦЕНА МОЖЕТ ОТЛИЧАТЬСЯ. ТОЧНУЮ СТОИМОСТЬ
                        УТОЧНЯЙТЕ У МЕНЕДЖЕРА.
                      </p>
                    </div>
                    <div className={styles.infoLine}>
                      <div className={styles.iconBlock}>
                        <BsTruck className={styles.infoIcon} />
                      </div>
                      <div>
                        <h2 className={styles.infoTitle}>ДОСТАВКА</h2>
                        <p>
                          МЫ ВСЕГДА ОРИЕНТИРУЕМСЯ НА СРОКИ ДОСТАВКИ ОТ 15 ДО 24
                          ДНЕЙ.
                        </p>
                      </div>
                    </div>
                    <div className={styles.infoLine}>
                      <div className={styles.iconBlock}>
                        <GoShieldCheck className={styles.infoIcon} />
                      </div>
                      <div>
                        <h2 className={styles.infoTitle}>ГАРАНТИЯ</h2>
                        <p>
                          ВСЕ ТОВАРЫ ПРОХОДЯТ 9-ТИ СТУПЕНЧАТУЮ ПРОВЕРКУ НА
                          ОРИГИНАЛЬНОСТЬ И ПОДДЕЛКА ИСКЛЮЧЕНА.
                        </p>
                      </div>
                    </div>
                    <div className={styles.infoLine}>
                      <div className={styles.iconBlock}>
                        <HiOutlineReceiptRefund className={styles.infoIcon} />
                      </div>
                      <div>
                        <h2 className={styles.infoTitle}>ВОЗВРАТ</h2>
                        <p>
                          К СОЖАЛЕНИЮ, У НАС НЕТ ВОЗВРАТОВ. ОДНАКО, ЕСЛИ ВАМ НЕ
                          ПОДОЙДЕТ РАЗМЕР, МЫ ПОМОЖЕМ ВАМ ПЕРЕПРОДАТЬ ВЕЩЬ,
                          ВЫСТАВИВ ЕЕ НА НАШЕМ САЙТЕ И В НАШЕМ TELEGRAM-КАНАЛЕ.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </>
          )}
        </div>
      ) : (
        <BurgerMenu />
      )}
    </div>
  );
};
