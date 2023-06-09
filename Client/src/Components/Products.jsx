import React, { useEffect, useState } from "react";
import "./Products.css";
import { Product } from "./Product";
import axios from "axios";

export const Products = ({ cat, filters, sort }) => {
  const [product, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  //for local devlopment
  // `http://localhost:8080/api/products?category=${cat}`
  // : `http://localhost:8080/api/products`

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://full-stack-ecommerce-o0a6m91tb-ankitnayan83.vercel.app/api/products?category=${cat}`
            : `https://full-stack-ecommerce-o0a6m91tb-ankitnayan83.vercel.app/api/products`
        );
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProduct(
        product.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [product, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProduct((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProduct((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProduct((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);
  return (
    <div className="products">
      {cat
        ? filteredProduct.map((item) => <Product item={item} key={item.id} />)
        : product
            .slice(0, 9)
            .map((item) => <Product item={item} key={item.id} />)}
    </div>
  );
};
