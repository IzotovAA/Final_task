import "./App.css";
import React, { createContext, useState, useEffect, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import MainPage from "./Pages/main/main";
import Footer from "./Components/Footer";
import AuthPage from "./Pages/auth";
import RegPage from "./Pages/reg";
import {
  onClickAuthEnter,
  onClickAuthReg,
  onClickBurger,
  onClickDataSearch,
} from "./services/onClick";
import { useSelector } from "react-redux";
import PopupMenu from "./Components/PopupMenu";
import SearchPage from "./Pages/search";
import SearchResultPage from "./Pages/result";
import PrivateRoute from "./services/privateRoute";

export const AppContext = createContext();

export default function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);
  const burgerVisibleWidth = 800;
  const popupClass = "preload popup-container popup--close";

  useEffect(() => {
    function handlerResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handlerResize);
    return () => {
      window.removeEventListener("resize", handlerResize);
    };
  }, [screenWidth]);

  return (
    <AppContext.Provider value={{ screenWidth, burgerVisibleWidth }}>
      <Header
        auth={isAuth}
        onClickReg={() => {
          onClickAuthReg(navigate);
        }}
        onClickEnter={() => {
          onClickAuthEnter(navigate);
        }}
        onClickBurger={onClickBurger}
      />

      <PopupMenu
        auth={isAuth}
        className={popupClass}
        onClickBg={onClickBurger}
        onClickEnter={() => {
          onClickAuthEnter(navigate);
        }}
        onClickReg={() => {
          onClickAuthReg(navigate);
        }}
      />

      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              auth={isAuth}
              onClick={() => {
                onClickDataSearch(navigate);
              }}
            />
          }
        />

        <Route
          path="/authenter"
          element={
            <AuthPage
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
        <Route element={<PrivateRoute />}>
          <Route path="/datasearch" element={<SearchPage />} />
          <Route path="/datasearch/result" element={<SearchResultPage />} />
        </Route>

        <Route
          path="*"
          element={
            <MainPage
              auth={isAuth}
              onClick={() => {
                onClickDataSearch(navigate);
              }}
            />
          }
        />
      </Routes>

      <Footer />
    </AppContext.Provider>
  );
}
