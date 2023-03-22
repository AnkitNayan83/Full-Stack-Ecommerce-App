import React from "react";
import { Link } from "react-router-dom";
import "./CategoryItem.css";

const CategoryItem = ({ item }) => {
  return (
    <div className="categoryItem">
      <Link to={`/products/${item.cat}`}>
        <img className="categoryItem__image" src={item.img} alt="" />
        <div className="categoryItem__info">
          <h2>{item.title}</h2>
          <button>Shop Now</button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
