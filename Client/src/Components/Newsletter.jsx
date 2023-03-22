import { Send } from "@mui/icons-material";
import React from "react";
import "./Newsletter.css";

export const Newsletter = () => {
  return (
    <div className="newsletter">
      <h1 className="newsletter__title">Newsletter</h1>
      <div className="newsletter__desc">
        Get timely updates from your favorite products.
      </div>
      <div className="newsletter__input">
        <input type="text" placeholder="Your Email" />
        <button>
          <Send />
        </button>
      </div>
    </div>
  );
};
