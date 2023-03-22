import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import "./Announcement.css";

const Announcement = () => {
  const [flash, setFlash] = useState(true);
  const closeFlash = () => {
    setFlash(false);
  };
  return (
    <div>
      {flash && (
        <div className="announcement">
          <div className="flash">
            <p> Super Deal ! Free Shipping on Orders Over $50</p>
          </div>
          <div className="flash__button" onClick={closeFlash}>
            <Close />
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcement;
