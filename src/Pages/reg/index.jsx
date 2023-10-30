import React from "react";
import "./index.css";
import Button from "../../Components/Button";
import Input from "../../Components/Input";

export default function RegPage({ onClickEnter, onClickReg }) {
  // форма для примера работы навигации, по хорошему нужно делать компонент
  // форму регистрации с уникальными классами
  return (
    <>
      <section className="reg">
        <form action="#" method="post" target="_blank" className="auth-form">
          <div className="authform-btns-container">
            <Button
              name="Войти"
              onClick={onClickEnter}
              className="authform-btn-enter"
            />
            <Button
              name="Зарегистрироваться"
              onClick={onClickReg}
              className="authform-btn-reg authform-btn--active"
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
            <Button name="Зарегестрироваться" className="authform-enter-btn" />
          </div>
        </form>
      </section>
    </>
  );
}
