import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.css";
import logo from "../../img/logo.svg";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import { AppContext } from "../../App";
import BurgerMenu from "../BurgerMenu";
import UserInfo from "../User";
import avatar from "../../img/avatar.jpg";
import { logout, companyLimitData } from "../../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";

export default function Header({
  auth,
  onClickReg,
  onClickEnter,
  onClickBurger,
}) {
  const { screenWidth } = useContext(AppContext);
  const { burgerVisibleWidth } = useContext(AppContext);
  const [headerContainerClass, setHeaderContainerClass] =
    useState("header-container");
  const [headerMenuClass, setHeaderMenuClass] = useState("header-menu");
  const [headerBtnsClass, setHeaderBtnsClass] = useState("header-btns");
  const [burgerMenuClass, setBurgerMenuClass] = useState(
    "burger burger--hidden burger-popup--close"
  );
  const [userInfoClass, setUserInfoClass] = useState("userInfo-container");
  const dispatch = useDispatch();

  const usedCompanyCount = useSelector((state) => state.user.usedCompanyCount);
  const companyLimit = useSelector((state) => state.user.companyLimit);

  let burgerVisibleFlag = useRef(false);

  if (screenWidth < burgerVisibleWidth) {
    burgerVisibleFlag.current = true;
  } else {
    burgerVisibleFlag.current = false;
  }

  useEffect(() => {
    if (burgerVisibleFlag.current) {
      setHeaderContainerClass("header-container--mini");
      setHeaderMenuClass("header-menu--hidden");
      setHeaderBtnsClass("header-btns--hidden");
      setUserInfoClass("hidden");
      setBurgerMenuClass("burger burger-popup--close");
    } else {
      setHeaderContainerClass("header-container");
      setHeaderMenuClass("header-menu");
      setHeaderBtnsClass("header-btns");
      setUserInfoClass("userInfo-container");
      setBurgerMenuClass("burger burger--hidden burger-popup--close");
    }
  }, [burgerVisibleFlag.current]);

  useEffect(() => {
    if (auth) {
      // искуственная задержка для визуальной проверки работы лоадера
      setTimeout(() => {
        dispatch(companyLimitData());
      }, 1000);
    }
  }, [auth]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="header">
        <div className={headerContainerClass}>
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
        </div>

        {!auth ? (
          <div className={headerBtnsClass}>
            <Button
              name="Зарегистрироваться"
              onClick={onClickReg}
              className="registrate-btn"
            />
            <span className="line"></span>
            <Button name="Войти" onClick={onClickEnter} className="enter-btn" />
          </div>
        ) : usedCompanyCount >= 0 && companyLimit >= 0 ? (
          <>
            {screenWidth <= 450 ? (
              <div className="available-services">
                <div className="available-services-text-container">
                  <div className="available-services-text-used">
                    Использовано компаний
                  </div>
                  <div className="available-services-digit-used">
                    {usedCompanyCount}
                  </div>
                  <div className="available-services-text-limit">
                    Лимит по компаниям
                  </div>
                  <div className="available-services-digit-limit">
                    {companyLimit}
                  </div>
                </div>
              </div>
            ) : (
              <div className="available-services">
                <div className="available-services-text-container">
                  <div className="available-services-text-used">
                    Использовано компаний
                  </div>
                  <div className="available-services-text-limit">
                    Лимит по компаниям
                  </div>
                </div>
                <div className="available-services-digit-container">
                  <div className="available-services-digit-used">
                    {usedCompanyCount}
                  </div>
                  <div className="available-services-digit-limit">
                    {companyLimit}
                  </div>
                </div>
              </div>
            )}

            <UserInfo
              name="Алексей А."
              avatar={avatar}
              onClick={logoutHandler}
              className={userInfoClass}
            />
          </>
        ) : (
          <>
            <div className="available-services--loader">
              <Loader />
            </div>

            <UserInfo
              name="Алексей А."
              avatar={avatar}
              onClick={logoutHandler}
              className={userInfoClass}
            />
          </>
        )}

        <BurgerMenu className={burgerMenuClass} onClick={onClickBurger} />
      </header>
    </>
  );
}
