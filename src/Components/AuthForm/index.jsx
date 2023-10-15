import { NavLink } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import "./index.css";
import React from "react";
import google from "../../img/google.svg";
import facebook from "../../img/facebook.svg";
import yandex from "../../img/yandex.svg";

export default function AuthForm({
  className,
  onClick,
  onClickEnter,
  onClickReg,
  path,
}) {
  let enterBtnClass = "authform-btn-enter";
  let regBtnClass = "authform-btn-reg";

  if (path === "/authenter") {
    enterBtnClass = "authform-btn-enter authform-btn--active";
    regBtnClass = "authform-btn-reg";
  } else if (path === "/authreg") {
    enterBtnClass = "authform-btn-enter";
    regBtnClass = "authform-btn-reg authform-btn--active";
  }

  return (
    <>
      <form action="#" method="post" target="_blank" className={className}>
        <div className="authform-btns-container">
          <Button
            name="Войти"
            onClick={onClickEnter}
            // className="authform-btn-enter"
            className={enterBtnClass}
          />
          <Button
            name="Зарегистрироваться"
            onClick={onClickReg}
            // className="authform-btn-reg"
            className={regBtnClass}
          />
        </div>
        <Input
          id="login"
          type="text"
          name="Логин или номер телефона:"
          placeholder=""
          containerClass="authform-login-container"
          labelClass="authform-login-label"
          inputClass="authform-login-input"
        />
        <Input
          id="password"
          type="password"
          name="Пароль:"
          placeholder=""
          containerClass="authform-pass-container"
          labelClass="authform-pass-label"
          inputClass="authform-pass-input"
        />
        <div className="authform-enter-btn-container">
          <Button
            name="Войти"
            onClick={onClick}
            className="authform-enter-btn"
            btnType="submit"
          />
        </div>
        <div className="authform-passrecover-container">
          <NavLink to="/passrecover" className="authform-passrecover">
            Восстановить пароль
          </NavLink>
        </div>
        <div className="authform-alternative-enter-container">
          <p>Войти через:</p>
          <div className="authform-alternative-enter-btn-container">
            <Button
              name={<img src={google} alt="google" />}
              onClick={onClick}
              className="authform-alternative-enter-btn"
            />
            <Button
              name={<img src={facebook} alt="facebook" />}
              onClick={onClick}
              className="authform-alternative-enter-btn"
            />
            <Button
              name={<img src={yandex} alt="yandex" />}
              onClick={onClick}
              className="authform-alternative-enter-btn"
            />
          </div>
        </div>
      </form>
    </>
  );
}
