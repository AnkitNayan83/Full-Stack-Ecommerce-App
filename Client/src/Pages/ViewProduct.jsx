import { Add, Remove } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Announcement from "../Components/Announcement";
import { Footer } from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Newsletter } from "../Components/Newsletter";
import { addProduct } from "../Redux/cartRedux";
import { publicRequest } from "../requestMethod";
import { useDispatch } from "react-redux";
import "./ViewProduct.css";

export const ViewProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const product_id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const handelClicks = (val) => {
    if (val === "sub") {
      if (quantity !== 1) {
        setQuantity(quantity - 1);
      }
    } else {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${product_id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [product_id]);

  const handelColor = (col) => {
    setColor(col);
  };

  const handelSize = (e) => {
    setSize(e.target.value);
  };

  const handelButton = () => {
    dispatch(addProduct({ ...product, quantity, size, color }));
  };

  return (
    <div className="viewProductPage">
      <Announcement />
      <Navbar />
      <div className="viewProduct">
        <div className="viewProduct__image">
          <img src={product?.img} alt="" />
        </div>
        <div className="viewProduct__info">
          <h1>{product.title}</h1>
          <p>{product.desc}</p>
          <span>Rs {product.price}</span>
          <div className="viewProduct__filters">
            <div className="viewProduct__filter">
              <span>Color</span>
              {product.color?.map((col) => (
                <div
                  onClick={() => handelColor(col)}
                  className="ViewProductBlack__filter"
                  style={{
                    backgroundColor: `${col}`,
                    border: "1px solid black",
                  }}
                  key={col}
                ></div>
              ))}
            </div>
            <div className="viewProduct__filter">
              <label className="label" htmlFor="size">
                Size
              </label>
              <select onChange={handelSize} name="" id="size">
                <option disabled selected>
                  Size
                </option>
                {product.size?.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="viewProduct__total">
            <div className="viewProduct__addOrRemove">
              <Add
                onClick={() => handelClicks("add")}
                style={{ cursor: "pointer" }}
              />
              <span className="viewProduct__quantity">{quantity}</span>
              <Remove
                onClick={() => handelClicks("sub")}
                style={{ cursor: "pointer" }}
              />
            </div>
            <button onClick={handelButton}>Add To Cart</button>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};
