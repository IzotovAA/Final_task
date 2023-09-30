import React from "react";
import "./index.css";

function Card({ image, text, className }) {
  return (
    <div className={className}>
      <img src={image} alt="card-pic" />
      <p className="card-text">{text}</p>
    </div>
  );
}

export default Card;
