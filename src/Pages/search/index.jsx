import SearchForm from "../../Components/SearchForm";
import "./index.css";
import img1 from "../../img/data-search1.svg";
import img2 from "../../img/data-search2.svg";
import img3 from "../../img/data-search3.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { initSearchForm } from "../../store/reducers/userSlice";
import { useDispatch } from "react-redux";

export default function SearchPage({ auth }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth]);

  console.log("SearchPage");

  useEffect(() => {
    dispatch(initSearchForm());
  }, []);

  return (
    <section className="data-search">
      <div className="data-search-form-container">
        <h1>Найдите необходимые данные в пару кликов.</h1>
        <p>
          Задайте параметры поиска. <br />
          Чем больше заполните, тем точнее поиск
        </p>
        <SearchForm auth={auth} />
      </div>
      <div className="data-search-image-container">
        <div className="data-search-image-1">
          <img src={img1} alt="pic" />
          <img src={img2} alt="pic" />
        </div>
        <div className="data-search-image-2">
          <img src={img3} alt="pic" />
        </div>
      </div>
    </section>
  );
}
