import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../img/logo.svg";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import "./index.css";
import { AppContext } from "../../App";
import BurgerMenu from "../BurgerMenu";

export default function Header({
  auth,
  onClickReg,
  onClickEnter,
  onClickBurger,
}) {
  const { screenWidth } = useContext(AppContext);

  const [headerMenuClass, setHeaderMenuClass] = useState("header-menu");
  const [headerBtnsClass, setHeaderBtnsClass] = useState("header-btns");
  const [burgerMenuClass, setBurgerMenuClass] = useState(
    "burger burger--hidden burger-popup--close"
  );

  let burgerVisibleFlag = useRef(false);

  if (screenWidth < 1000) {
    burgerVisibleFlag.current = true;
  } else {
    burgerVisibleFlag.current = false;
  }

  useEffect(() => {
    if (burgerVisibleFlag.current) {
      setHeaderMenuClass("header-menu--hidden");
      setHeaderBtnsClass("header-btns--hidden");
      setBurgerMenuClass("burger burger-popup--close");
    } else {
      setHeaderMenuClass("header-menu");
      setHeaderBtnsClass("header-btns");
      setBurgerMenuClass("burger burger--hidden burger-popup--close");
    }
  }, [burgerVisibleFlag.current]);

  return (
    <>
      <header className="header">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <ul className={headerMenuClass}>
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
        <div className={headerBtnsClass}>
          <Button
            name="Зарегистрироваться"
            onClick={onClickReg}
            className="registrate-btn"
          />
          <span className="line"></span>
          <Button name="Войти" onClick={onClickEnter} className="enter-btn" />
        </div>
        <BurgerMenu className={burgerMenuClass} onClick={onClickBurger} />
      </header>
    </>
  );
}
