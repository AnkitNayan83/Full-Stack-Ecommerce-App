import {
  Call,
  FacebookOutlined,
  Instagram,
  MailOutline,
  Room,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__left">
        <h1>ZEPP.</h1>
        <p>
          There are many variations of passages of Lorem Ipsum available , but
          the majority have suffered alteration in some form , by injected
          humour, or randomised words which don't look even slightly believable.
        </p>
        <div className="socialIcons">
          <div className="socialIcon" style={{ background: "#3B5999" }}>
            <FacebookOutlined />
          </div>
          <div className="socialIcon" style={{ background: "#55ACEE" }}>
            <Twitter />
          </div>
          <div className="socialIcon" style={{ background: "#E4405F" }}>
            <Instagram />
          </div>
          <div className="socialIcon" style={{ background: "#075E54" }}>
            <WhatsApp />
          </div>
        </div>
      </div>
      <div className="footer__center">
        <h3>Useful Links</h3>
        <ul>
          <li>Home</li>
          <li>Cart</li>
          <li>Man Fashion</li>
          <li>Woman Fashion</li>
          <li>Accessories</li>
          <li>My Account</li>
          <li>Order Tracking</li>
          <li>Whishlist</li>
          <li>Terms</li>
        </ul>
      </div>
      <div className="footer__right">
        <h3>Contact</h3>
        <div className="contactItem">
          <Room style={{ marginRight: "10px" }} /> GF 105 & 106 DLF Emporio
          Vasant Kunj II, New Delhi 110070
        </div>
        <div className="contactItem">
          <Call style={{ marginRight: "10px" }} /> 022 5032 3288
        </div>
        <div className="contactItem">
          <MailOutline style={{ marginRight: "10px" }} /> contact@zepp.dev
        </div>
        <img
          className="payment__image"
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          alt=""
        />
      </div>
    </div>
  );
};
