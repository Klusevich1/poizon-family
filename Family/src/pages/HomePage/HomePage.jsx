import React, { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import styles from "./HomePage.module.css";
import { Banner } from "../../components/Banner/Banner";
import { About } from "../../components/About/About";
import { PopularProd } from "../../components/PopularProd/PopularProd";
import BrandsSlider from "../../components/BrandsSlider/BrandsSlider";
import { InfoCards } from "../../components/InfoCards/InfoCards";
import { Reviews } from "../../components/Reviews/Reviews";
import { BurgerMenu } from "../../components/BurgerMenu/BurgerMenu";
import { Subscribe } from "../../components/Subscribe/Subscribe";
import { Footer } from "../../components/Footer/Footer";
import { AppContext } from "../../context/AppContext";
import { Loading } from "../../components/Loading/Loading";
import axios from "axios";

export const HomePage = () => {
  const { open, isActiveSvg, setIsActiveSvg } = useContext(AppContext);
  const [isActive, setIsActive] = useState(false);
  const [sneakers, setSneakers] = useState([])
  const [clothes, setClothes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsActiveSvg(true)
    localStorage.setItem("isActiveSvg", JSON.stringify(true));
    setTimeout(() => {
      setIsActive(true);
    }, 300)
    setTimeout(() => {
      localStorage.setItem("isActiveSvg", JSON.stringify(false));
      setIsActiveSvg(false)
    }, 3000)
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const sneakersResponse = await axios.get(
          `https://poizonfamily.ru/api/products?category=sneakers&limit=10&page=46`
        );
        const clothesResponse = await axios.get(
          `https://poizonfamily.ru/api/products?category=clothes&limit=10&page=25`
        );
        setSneakers(sneakersResponse.data[1])
        setLoading(false);
        setClothes(clothesResponse.data[1])
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      {!open ? (
        <>
          <Banner />
          <BrandsSlider />
          {loading ? <Loading /> : <PopularProd category={'sneakers'} items={sneakers}/>}
          <InfoCards />
          {loading ? <Loading /> : <PopularProd category={'clothes'} items={clothes}/>}
          <Subscribe />
          <About />
          <Reviews />
          <Footer />
        </>
      ) : (
        <BurgerMenu />
      )}
    </div>
  );
};
