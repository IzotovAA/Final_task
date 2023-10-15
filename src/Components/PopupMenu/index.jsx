import React, { useContext, useEffect } from "react";
import logo from "../../img/logo-popup.svg";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import "./index.css";
import { AppContext } from "../../App";

export default function PopupMenu({ onClick, onClickBg, className }) {
  const { screenWidth } = useContext(AppContext);

  useEffect(() => {
    const body = document.body;
    const popupBg = document.querySelector(".popup-bg");
    const popup = document.querySelector(".popup-container");

    if (popup.className.match("popup--open")) {
      if (screenWidth >= 1000) {
        body.className = "";
        popupBg.className = "popup-bg popup-bg--hidden";
        popup.className = "popup-container popup--close";
      }
    }
  }, [screenWidth]);

  return (
    <>
      <div className="popup-bg popup-bg--hidden" onClick={onClickBg}></div>
      <div className={className}>
        <div className="popup-header">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className="popup-body">
          <ul className="popup-body-menu">
            <li className="popup-body-menu__item">
              <NavLink to="/">Главная</NavLink>
            </li>
            <li className="popup-body-menu__item">
              <NavLink to="/rates">Тарифы</NavLink>
            </li>
            <li className="popup-body-menu__item">
              <NavLink to="/faq">FAQ</NavLink>
            </li>
          </ul>
          <div className="popup-body-btns">
            <Button
              name="Зарегистрироваться"
              onClick={onClick}
              className="popup-registrate-btn registrate-btn"
            />
            <Button
              name="Войти"
              onClick={onClick}
              className="popup-enter-btn enter-btn"
            />
          </div>
        </div>
      </div>
    </>
  );
}
