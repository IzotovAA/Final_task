import React from "react";
import logo from "../../img/logo-footer.svg";
import "./index.css";

export default function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="logo" />
      <div className="footer-info">
        <p>г. Москва, Цветной б-р, 40</p>
        <p>+7 495 771 21 11</p>
        <p>info@skan.ru</p>
        <p className="p-false">space</p>
        <p>Copyright. 2022</p>
      </div>
    </footer>
  );
}
