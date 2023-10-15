import "./App.css";
import React, { createContext, useState, useEffect, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import MainPage from "./Pages/main/main";
import Footer from "./Components/Footer";
import onClickBurger from "./services/onClickBurger";
import AuthPage from "./Pages/auth";
import onClickAuth from "./services/onClickAuthEnter";
import RegPage from "./Pages/reg";
import onClickAuthEnter from "./services/onClickAuthEnter";
import onClickAuthReg from "./services/onClickAuthReg";

export const AppContext = createContext();

// следующий шаг - реализовать авторизацию, отправку формы

export default function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  let renderCounter = useRef(0);

  console.log("App");
  // console.log("renderCounter", renderCounter.current);
  renderCounter.current++;

  useEffect(() => {
    function handlerResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handlerResize);
    return () => {
      window.removeEventListener("resize", handlerResize);
    };
  }, [screenWidth]);

  function onClick() {
    console.log("onClick");
  }

  return (
    <AppContext.Provider value={{ screenWidth, renderCounter }}>
      <Header
        auth={false}
        onClickReg={() => {
          onClickAuthReg(navigate);
        }}
        onClickEnter={() => {
          onClickAuthEnter(navigate);
        }}
        onClickBurger={onClickBurger}
      />
      <Routes>
        <Route path="/" element={<MainPage auth={false} onClick={onClick} />} />
        <Route
          path="/authenter"
          element={
            <AuthPage
              onClick={onClick}
              onClickEnter={() => {
                onClickAuthEnter(navigate);
              }}
              onClickReg={() => {
                onClickAuthReg(navigate);
              }}
              path="/authenter"
            />
          }
        />
        <Route
          path="/authreg"
          element={
            <RegPage
              onClick={onClick}
              onClickEnter={() => {
                onClickAuthEnter(navigate);
              }}
              onClickReg={() => {
                onClickAuthReg(navigate);
              }}
              path="/authreg"
            />
          }
        />
        <Route path="*" element={<MainPage auth={false} onClick={onClick} />} />
      </Routes>
      <Footer />
    </AppContext.Provider>
  );
}
