import "./index.css";
import React, { useContext } from "react";
import authPic from "../../img/auth-pic.svg";
import lock from "../../img/auth-lock.svg";
import AuthForm from "../../Components/AuthForm";
import { AppContext } from "../../App";

export default function AuthPage({ onClickEnter, onClickReg, path }) {
  const { screenWidth } = useContext(AppContext);

  return (
    <>
      <section className="auth">
        {screenWidth <= 800 ? (
          <>
            <h1>
              Для оформления подписки на тариф, необходимо авторизоваться.
            </h1>
            <img src={lock} alt="lock" className="auth-lock" />
            <AuthForm
              className="auth-form"
              onClickEnter={onClickEnter}
              onClickReg={onClickReg}
              path={path}
            />
            <img src={authPic} alt="auth-pic" className="auth-picture" />
          </>
        ) : (
          <>
            <div className="auth-info">
              <h1>
                Для оформления подписки на тариф, необходимо авторизоваться.
              </h1>
              <img src={authPic} alt="auth-pic" />
            </div>
            <img src={lock} alt="lock" className="auth-lock" />
            <AuthForm
              className="auth-form"
              onClickEnter={onClickEnter}
              onClickReg={onClickReg}
              path={path}
            />
          </>
        )}
      </section>
    </>
  );
}
