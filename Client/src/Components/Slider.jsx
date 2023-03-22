import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import React, { useState } from "react";
import "./Slider.css";
import { sliderItems } from "../data";

const Slider = () => {
  const [slideIndex, setslideIndex] = useState(0);

  const handelClick = (directions) => {
    if (directions === "left") {
      setslideIndex(slideIndex === 0 ? 2 : slideIndex - 1);
    } else {
      setslideIndex(slideIndex === 2 ? 0 : slideIndex + 1);
    }
    console.log(slideIndex);
  };

  return (
    <div className="slider">
      <div className="slider__leftArrow" onClick={() => handelClick("left")}>
        <ArrowLeft />
      </div>
      <div
        className="slider__content"
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
      >
        {sliderItems.map((item) => (
          <div
            key={item.id}
            className="slide"
            style={{ background: `#${item.bg}` }}
          >
            <div className="slider__image">
              <img src={item.img} alt="" />
            </div>
            <div className="slider__info">
              <h1>{item.title}</h1>
              <p>{item.desc}</p>
              <button>Buy Now</button>
            </div>
          </div>
        ))}
      </div>
      <div className="slider__rightArrow" onClick={() => handelClick("right")}>
        <ArrowRight />
      </div>
    </div>
  );
};

export default Slider;
