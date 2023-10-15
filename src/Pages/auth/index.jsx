import "./index.css";
import React from "react";
import authPic from "../../img/auth-pic.svg";
import lock from "../../img/auth-lock.svg";
import AuthForm from "../../Components/AuthForm";

export default function AuthPage({ onClick, onClickEnter, onClickReg, path }) {
  return (
    <>
      <section className="auth">
        <div className="auth-info">
          <h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
          <img src={authPic} alt="auth-pic" />
        </div>
        <img src={lock} alt="lock" className="auth-lock" />
        <AuthForm
          className="auth-form"
          onClick={onClick}
          onClickEnter={onClickEnter}
          onClickReg={onClickReg}
          path={path}
        />
      </section>
    </>
  );
}
