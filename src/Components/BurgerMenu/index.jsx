import React from "react";
import "./index.css";

export default function BurgerMenu({ className, onClick }) {
  return (
    <div className={className} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
