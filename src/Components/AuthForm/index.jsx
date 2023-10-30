import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import "./index.css";
import React, { useState } from "react";
import google from "../../img/google.svg";
import facebook from "../../img/facebook.svg";
import yandex from "../../img/yandex.svg";
import { setLogin, setPassword, login } from "../../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../../services/auth";
import { setToLocalStorage } from "../../services/localStorage";

export default function AuthForm({
  className,
  onClickEnter,
  onClickReg,
  path,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.user.login);
  const passwordData = useSelector((state) => state.user.password);

  const [loginError, setLoginError] = useState(null);

  let enterBtnClass = "authform-btn-enter";
  let regBtnClass = "authform-btn-reg";

  if (path === "/authenter") {
    enterBtnClass = "authform-btn-enter authform-btn--active";
    regBtnClass = "authform-btn-reg";
  } else if (path === "/authreg") {
    enterBtnClass = "authform-btn-enter";
    regBtnClass = "authform-btn-reg authform-btn--active";
  }

  const loginHandler = async (event) => {
    try {
      event.preventDefault();
      const data = await authService.login({
        login: loginData,
        password: passwordData,
      });
      if (data) {
        setToLocalStorage("token", data.data.accessToken);
        setToLocalStorage("expire", data.data.expire);
        dispatch(login());
        navigate("/");
      }
    } catch (error) {
      if (error.response.data.message) {
        console.log("error: ", error.response.data.message);
        setLoginError(
          <div className="login-error">{error.response.data.message}</div>
        );
      } else console.log("error: ", error);
    }
  };

  return (
    <>
      <form className={className} onSubmit={loginHandler}>
        <div className="authform-btns-container">
          <Button
            name="Войти"
            onClick={onClickEnter}
            className={enterBtnClass}
          />
          <Button
            name="Зарегистрироваться"
            onClick={onClickReg}
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
          onChange={(event) => {
            dispatch(setLogin(event.target.value));
            if (loginError !== null) setLoginError(null);
          }}
        />

        <Input
          id="password"
          type="password"
          name="Пароль:"
          placeholder=""
          containerClass="authform-pass-container"
          labelClass="authform-pass-label"
          inputClass="authform-pass-input"
          onChange={(event) => {
            dispatch(setPassword(event.target.value));
            if (loginError !== null) setLoginError(null);
          }}
        />

        {loginError}

        <div className="authform-enter-btn-container">
          <Button
            name="Войти"
            className="authform-enter-btn"
            btnType="submit"
            disabled={loginData && passwordData ? false : true}
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
              className="authform-alternative-enter-btn"
            />

            <Button
              name={<img src={facebook} alt="facebook" />}
              className="authform-alternative-enter-btn"
            />

            <Button
              name={<img src={yandex} alt="yandex" />}
              className="authform-alternative-enter-btn"
            />
          </div>
        </div>
      </form>
    </>
  );
}
