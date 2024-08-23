import React, { useContext } from "react";
import styles from "./DropDown.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export const DropDown = ({
  option,
  setCategory,
  activePay,
  setType,
  setSize,
  setBrand,
  setMinPrice,
  setMaxPrice,
  setSortBy,
  setIsFiltered,
  isFiltered,
}) => {
  const { setCurrentPage } = useContext(AppContext);
  const dropRef = React.useRef();
  const [isActive, setIsActive] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  if (isFiltered) {
    setIsFiltered(false);
    localStorage.setItem("currentPage", 1);
    setCurrentPage(1);
    const queryParams = new URLSearchParams(location.search);
    const typeReq = queryParams.get("type");
    const sizeReq = queryParams.get("size");
    const brandReq = queryParams.get("brand");
    const minPriceReq = queryParams.get("minPrice");
    const maxPriceReq = queryParams.get("maxPrice");
    if (activePay === "👟Кроссовки") {
      setCategory("sneakers");
    } else if (activePay === "👕Одежда") {
      setCategory("clothes");
    }
    setMinPrice(minPriceReq);
    setMaxPrice(maxPriceReq);
    if (option.defValue === "Любой размер") {
      localStorage.setItem("selectedSize", sizeReq ? sizeReq : option.defValue);
      setSize(sizeReq);
    } else if (option.defValue === "Любой бренд") {
      localStorage.setItem(
        "selectedBrand",
        brandReq ? brandReq : option.defValue
      );
      setBrand(brandReq);
    } else {
      localStorage.setItem("selectedType", typeReq ? typeReq : option.defValue);
      setType(typeReq);
    }
  }

  const activeDrop = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div ref={dropRef} className={styles.dropDown}>
        <p className={styles.dropTitle}>{option.title}</p>
        <div className={styles.dropDownBtn} onClick={activeDrop}>
          {option.defValue === "Любой размер"
            ? localStorage.getItem("selectedSize")
            : option.defValue === "Любой бренд"
            ? localStorage.getItem("selectedBrand")
            : localStorage.getItem("selectedType")}
          <IoIosArrowDown style={{ marginLeft: "5px" }} />
        </div>
        {isActive && (
          <div className={styles.dropDownContent}>
            {option.items.map((opt) => (
              <div
                className={styles.dropDownItem}
                onClick={() => {
                  if (option.defValue === "Любой размер") {
                    setSize(opt);
                    localStorage.setItem("selectedSize", opt);
                  } else if (option.defValue === "Любой бренд") {
                    setBrand(opt);
                    localStorage.setItem("selectedBrand", opt);
                  } else if (option.defValue === "Любой тип") {
                    setType(opt);
                    localStorage.setItem("selectedType", opt);
                  }
                  setIsActive(false);
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
