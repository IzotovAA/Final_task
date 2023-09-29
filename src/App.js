import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Header from "./Components/Header";
import MainPage from "./Pages/main";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Header auth={false} />
      <div className="margin">для теста отступов</div>
      <MainPage auth={false} onClick={() => {}} />
      <Footer />
    </>
  );
}

export default App;
