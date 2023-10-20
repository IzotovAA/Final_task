import React, { useContext, useEffect } from "react";
import logo from "../../img/logo-popup.svg";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import "./index.css";
import { AppContext } from "../../App";
import avatar from "../../img/avatar.jpg";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/userSlice";
import { onClickBurger } from "../../services/onClick";

export default function PopupMenu({
  auth,
  onClickBg,
  className,
  onClickEnter,
  onClickReg,
}) {
  const { screenWidth } = useContext(AppContext);
  const { burgerVisibleWidth } = useContext(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const body = document.body;
    const popupBg = document.querySelector(".popup-bg");
    const popup = document.querySelector(".popup-container");

    if (popup.className.match("popup--open")) {
      if (screenWidth >= burgerVisibleWidth) {
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
          {!auth ? (
            <div className="popup-body-btns">
              <Button
                name="Зарегистрироваться"
                onClick={() => {
                  onClickReg();
                  onClickBurger();
                }}
                className="popup-registrate-btn registrate-btn"
              />
              <Button
                name="Войти"
                onClick={() => {
                  onClickEnter();
                  onClickBurger();
                }}
                className="popup-enter-btn enter-btn"
              />
            </div>
          ) : (
            <div className="userInfo-popup-container">
              <img src={avatar} alt="avatar" />
              <p>Алексей А.</p>
              <Button
                name="Выйти"
                onClick={() => {
                  dispatch(logout());
                  onClickBurger();
                }}
                className="userName-popup-btn enter-btn"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
