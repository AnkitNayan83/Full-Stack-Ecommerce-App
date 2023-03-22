import { FavoriteBorderOutlined, LocalMall, Search } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

export const Product = ({ item }) => {
  return (
    <div className="product">
      <div className="circle"></div>
      <img className="product__image" src={item.img} alt="" />
      <div className="product__info">
        <div className="product__infoIcon bag">
          <LocalMall />
        </div>
        <div className="product__infoIcon search">
          <Link to={`/product/${item._id}`}>
            <Search />
          </Link>
        </div>
        <div className="product__infoIcon heart">
          <FavoriteBorderOutlined />
        </div>
      </div>
    </div>
  );
};
