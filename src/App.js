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

// сделать адаптацию к разрешениям до мобильного !!!!!!!!!!!!!!!!!!
// осталось адаптировать страницу результата поиска и попап меню

// если останется время
// 1. как вытащить из xml DOM вместе с тегами и изображениями
// 2. переписать createAsyncThunk на новую версию
// 3. подумать как нормально обработать ошибки запросов
// 4. сделать анимацию бургера и крестика как в макете
// 5. улучшить стилизацию инпутов (в том числе при ошибке) в форме запроса

export default function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);
  const burgerVisibleWidth = 800;
  const popupClass = "preload popup-container popup--close";
  console.log("App isAuth", isAuth);

  let renderCounter = useRef(0);

  console.log("renderCounter", renderCounter.current);
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
    <AppContext.Provider
      value={{ screenWidth, burgerVisibleWidth, renderCounter }}
    >
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
