import React from "react";
import logo from "../../img/logo.svg";
import { NavLink } from "react-router-dom";
import Button from "../Button";

function Header(auth) {
  return (
    <>
      <header className="header">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <ul className="header-menu">
          <li className="header-menu__item">
            <NavLink to="/">Главная</NavLink>
          </li>
          <li className="header-menu__item">
            <NavLink to="/rates">Тарифы</NavLink>
          </li>
          <li className="header-menu__item">
            <NavLink to="/faq">FAQ</NavLink>
          </li>
        </ul>
        <div className="header-btns">
          <Button
            name="Зарегистрироваться"
            onClick={() => {}}
            className="registrate_btn"
          />
          <span className="line"></span>
          <Button name="Войти" onClick={() => {}} className="enter_btn" />
        </div>
      </header>
    </>
  );
}

export default Header;
