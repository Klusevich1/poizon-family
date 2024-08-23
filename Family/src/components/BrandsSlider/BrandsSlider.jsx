import React from "react";
import Slider from "react-slick";
import styles from "./BrandsSlider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function BrandsSlider() {
  const settings = {
    infinite: true,
    arrows: false,
    speed: 2000,
    pauseOnHover: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipe: false,
    autoplay: true,
    autoplaySpeed: 200,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };
  const brands = [
    "/images/brands/adidas.svg",
    "/images/brands/carhartt.svg",
    "/images/brands/champion.svg",
    "/images/brands/gucci.svg",
    "/images/brands/louis.svg",
    "/images/brands/nike.svg",
    "/images/brands/stone.svg",
    "/images/brands/asics.svg",
    "/images/brands/balance.svg",
    "/images/brands/reebok.svg",
    "/images/brands/converse.svg",
    "/images/brands/puma.svg",
  ];
  return (
    <div className={styles.sliderWrap}>
      <Slider {...settings} >
        {brands.map((br, index) => (
          <img className={styles.image} key={index} src={br} alt="" />
        ))}
      </Slider>
    </div>
  );
}

export default BrandsSlider;
