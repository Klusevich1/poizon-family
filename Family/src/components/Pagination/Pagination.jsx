import React, { useContext, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "./pagination.css";
import { AppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

export const Pagination = ({ numOfPages, setLoading, link }) => {
  const { setIsPaginate, currentPage, setCurrentPage, sortBy, setSortBy } =
    useContext(AppContext);
  const totalPages = Math.ceil(numOfPages / 48);
  const navigate = useNavigate();
  const location = useLocation();

  function handlePageChange(page) {
    setLoading(true);
    console.log(sortBy);
    localStorage.setItem("currentPage", page);
    setCurrentPage(page);
    setIsPaginate(true);
    localStorage.getItem("selectedSort") === "По возрастанию цены"
      ? setSortBy("increasing")
      : localStorage.getItem("selectedSort") === "По убыванию цены"
      ? setSortBy("decreasing")
      : setSortBy("");
    navigate(
      `${link}${sortBy && `&sortBy=${sortBy}`}&page=${localStorage.getItem(
        "currentPage"
      )}`
    );
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageReq = parseInt(queryParams.get("page"));
    setCurrentPage(pageReq);
    localStorage.getItem("selectedSort") === "По возрастанию цены"
      ? setSortBy("increasing")
      : localStorage.getItem("selectedSort") === "По убыванию цены"
      ? setSortBy("decreasing")
      : setSortBy("");
  }, [navigate]);

  return (
    <ResponsivePagination
      total={totalPages}
      current={currentPage}
      maxWidth={350}
      onPageChange={(page) => handlePageChange(page)}
    />
  );
};
