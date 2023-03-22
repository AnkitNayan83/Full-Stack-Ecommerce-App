import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Announcement from "../Components/Announcement";
import { Footer } from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Newsletter } from "../Components/Newsletter";
import { Products } from "../Components/Products";
import "./AllProduct.css";

export const AllProduct = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");

  const handelFilter = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
  };

  const handelSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="viewproduct">
      <Navbar />
      <Announcement />
      <h1 className="product__title">{cat}</h1>
      <div className="product__filters">
        <div className="filter">
          <span>Filter Products:</span>
          <select name="color" onChange={handelFilter}>
            <option disabled>Color</option>
            <option>white</option>
            <option>black</option>
            <option>red</option>
            <option>blue</option>
            <option>yellow</option>
            <option>green</option>
          </select>
          <select name="size" onChange={handelFilter}>
            <option disabled>Size</option>
            <option value={"XS"}>XS</option>
            <option value={"S"}>Small</option>
            <option value={"M"}>Medium</option>
            <option value={"L"}>Large</option>
            <option value={"XL"}>XL</option>
            <option value={"XXL"}>XXL</option>
          </select>
        </div>
        <div className="filter">
          <span>Sort Products:</span>
          <select name="sort" onChange={handelSort}>
            <option value={"newest"}>Newest</option>
            <option value={"asc"}>Price(low to high)</option>
            <option value={"desc"}>Price(high to low)</option>
          </select>
        </div>
      </div>
      <Products cat={cat} filters={filter} sort={sort} />
      <Newsletter />
      <Footer />
    </div>
  );
};
