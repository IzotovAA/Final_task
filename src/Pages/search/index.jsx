import SearchForm from "../../Components/SearchForm";
import "./index.css";
import img1 from "../../img/data-search1.svg";
import img2 from "../../img/data-search2.svg";
import img3 from "../../img/data-search3.svg";
import { useContext, useEffect } from "react";
import { initSearchForm } from "../../store/reducers/userSlice";
import { useDispatch } from "react-redux";
import { AppContext } from "../../App";

export default function SearchPage() {
  const { screenWidth } = useContext(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initSearchForm());
  }, []);

  return (
    <section className="data-search">
      {screenWidth <= 1000 ? (
        <>
          <div className="data-search-form-container">
            <div className="data-search-form-info">
              <div className="data-search-form-info-text">
                <h1>
                  Найдите необходимые <br />
                  данные в пару кликов.
                </h1>
                <p>
                  Задайте параметры поиска. <br />
                  Чем больше заполните, тем точнее поиск
                </p>
              </div>
              <div className="data-search-image-1">
                <img
                  src={img1}
                  alt="pic"
                  className="data-search-image-1__item1"
                />
              </div>
            </div>

            <SearchForm />
          </div>
          <div className="data-search-image-container">
            <div className="data-search-image-2">
              <img src={img3} alt="pic" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="data-search-form-container">
            <h1>
              Найдите необходимые <br />
              данные в пару кликов.
            </h1>
            <p>
              Задайте параметры поиска. <br />
              Чем больше заполните, тем точнее поиск
            </p>
            <SearchForm />
          </div>
          <div className="data-search-image-container">
            <div className="data-search-image-1">
              <img
                src={img1}
                alt="pic"
                className="data-search-image-1__item1"
              />
              <img
                src={img2}
                alt="pic"
                className="data-search-image-1__item2"
              />
            </div>
            <div className="data-search-image-2">
              <img src={img3} alt="pic" />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
