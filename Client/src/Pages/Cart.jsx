import { Add, Remove } from "@mui/icons-material";
import React, { useEffect } from "react";
import Announcement from "../Components/Announcement";
import { Footer } from "../Components/Footer";
import Navbar from "../Components/Navbar";
import "./Cart.css";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { userRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeProduct, reset } from "../Redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE;

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeReq = async () => {
      setLoading(true);
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.totalPrice * 100,
        });
        re1set();
        navigate("/success", {
          state: {
            stripeData: res.data,
            products: cart,
          },
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    stripeToken && makeReq();
  }, [stripeToken, cart.totalPrice, navigate, cart]);

  const dispatch = useDispatch();

  const handelClick = (id, price, quantity) => {
    dispatch(removeProduct({ id, price, quantity }));
  };

  const re1set = () => {
    dispatch(reset());
  };

  return (
    <div>
      {" "}
      {loading ? (
        "loading please wait.........."
      ) : (
        <>
          <Announcement />
          <Navbar />
          <div className="cart">
            <h1 className="cart__title">Your Bag</h1>
            <div className="cart__top">
              <button className="button__right" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
              <div className="cartTop__texts">
                <span>Shopping Bag(2)</span>
                <span>Your whishlist (0)</span>
              </div>
              <button className="button__left">Checkout Now</button>
            </div>
            <div className="cart__bottom">
              <div className="cartBottom__info">
                {cart.products.map((item) => (
                  <div key={item._id} className="cart__product">
                    <div className="cartProduct__details">
                      <img src={item.img} alt="" />
                      <div className="detail_">
                        <span className="detail__name">
                          <b>Product:</b> {item.title}
                        </span>
                        <span className="detail__id">
                          <b>ID: </b> {item._id}
                        </span>
                        <div className="detail__color"></div>
                        <span className="detail__size">
                          <b>Size:</b> {item.size}
                        </span>
                      </div>
                    </div>
                    <div className="cartProduct__price">
                      <div className="cartProduct__amount">
                        <Add />
                        <div>{item.quantity}</div>
                        <Remove />
                      </div>
                      <button
                        onClick={() =>
                          handelClick(item._id, item.price, item.quantity)
                        }
                        className="cartProduct__remove"
                      >
                        Remove From Cart
                      </button>
                      <div className="cartFinal__amount">
                        Rs {item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cartBottom__summary">
                <h2>Order Summary</h2>
                <div className="summary__items">
                  <span>Subtotal</span>
                  <span className="summary__price">Rs {cart.totalPrice}</span>
                </div>
                <div className="summary__items">
                  <span>Estimated Shipping</span>
                  {cart.totalPrice > 0 ? (
                    <span className="summary__price">Rs 59</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="summary__items">
                  <span>Shipping Discount</span>
                  {cart.totalPrice > 0 ? (
                    <span className="summary__price">Rs -59</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="summary__items summary__total">
                  <span>Total</span>
                  <span className="summary__price">Rs {cart.totalPrice}</span>
                </div>
                <StripeCheckout
                  name="Zepp"
                  image="https://images.unsplash.com/photo-1605557626613-748697e50913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                  billingAddress
                  shippingAddress
                  description="Your total is Rs 20"
                  amount={cart.totalPrice * 100}
                  token={onToken}
                  stripeKey={KEY}
                  currency="INR"
                  allowRememberMe
                >
                  <button className="btn" style={{ cursor: "pointer" }}>
                    Pay Now
                  </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
          <div className="clear">
            <button onClick={re1set} className="clear__cart">
              Clear Cart
            </button>
          </div>
          <Footer />{" "}
        </>
      )}
    </div>
  );
};
