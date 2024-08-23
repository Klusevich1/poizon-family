import React, { useContext, useState } from "react";
import styles from "./Sorting.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { GoSortAsc } from "react-icons/go";
import { GoSortDesc } from "react-icons/go";
import { AppContext } from "../../context/AppContext";
import { Link, useLocation } from "react-router-dom";

export const Sorting = ({ setLoading, link }) => {
  const { sortBy, setSortBy } = useContext(AppContext);
  const [isActive, setIsActive] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Без сортировки");
  const dropRef = React.useRef();
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
  console.log(sortBy);

  const handleSort = (text) => {
    setLoading(true);
    setIsClick(true);
    localStorage.setItem("selectedSort", text);
    setSelectedSort(text);
    if (text === "По возрастанию цены") {
      setSortBy("increasing");
    } else if (text === "По убыванию цены") {
      setSortBy("decreasing");
    }
    setIsActive(false);
  };

  const activeDrop = () => {
    setIsActive(!isActive);
  };
  return (
    <div ref={dropRef} className={styles.sortBlock}>
      <div className={styles.sortField}>
        <div className={styles.selectedSort} onClick={activeDrop}>
          {localStorage.getItem("selectedSort") === "По возрастанию цены" ? (
            <GoSortAsc fontSize={17} />
          ) : localStorage.getItem("selectedSort") === "По убыванию цены" ? (
            <GoSortDesc fontSize={17} />
          ) : (
            <></>
          )}
          {localStorage.getItem("selectedSort")}
          <IoIosArrowDown style={{ marginLeft: "5px" }} />
        </div>
        {isActive && (
          <div className={styles.options}>
            <Link to={`https://poizonfamily.ru${link}&page=1`}>
              <div onClick={() => handleSort("Без сортировки")}>
                <p>Без сортировки</p>
              </div>
            </Link>
            <Link to={`https://poizonfamily.ru${link}&sortBy=increasing&page=1`}>
              <div onClick={() => handleSort("По возрастанию цены")}>
                <GoSortAsc fontSize={17} />
                <p>По возрастанию цены</p>
              </div>
            </Link>
            <Link to={`https://poizonfamily.ru${link}&sortBy=decreasing&page=1`}>
              <div onClick={() => handleSort("По убыванию цены")}>
                <GoSortDesc fontSize={17} />
                <p>По убыванию цены</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
