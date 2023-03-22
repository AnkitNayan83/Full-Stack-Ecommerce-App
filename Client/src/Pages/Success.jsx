import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Product } from "../Components/Product";
import { userRequest } from "../requestMethod";
import "./Success.css";

export const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.totalPrice,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch (error) {
        console.log(error);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  console.log(cart);
  return (
    <div className="order">
      <h1 className="order__title">Your Orders</h1>
      <div className="order__items">
        {cart.products.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </div>
      <span className="order__text">
        {orderId
          ? `Order has been created successfully. Your order number is ${orderId}`
          : `Successfull. Your order is being prepared...`}
      </span>
      <Link to={"/"}>
        <button className="order__button">Go to Homepage</button>
      </Link>
    </div>
  );
};
