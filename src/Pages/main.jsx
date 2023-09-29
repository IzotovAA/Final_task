import React from "react";
import "./index.css";
import Button from "../Components/Button";
import picture from "../img/search.svg";

function MainPage({ auth, onClick }) {
  return (
    <>
      <section className="search">
        <div className="search-info">
          <h1>
            сервис по поиску <br />
            публикаций <br />
            о компании <br />
            по его ИНН
          </h1>
          <p>
            Комплексный анализ публикаций, получение данных <br />в формате PDF
            на электронную почту.
          </p>
          <Button
            name="Запросить данные"
            onClick={onClick}
            className="search-btn"
          />
        </div>
        <img src={picture} alt="search-pic" className="search-picture" />
      </section>

      <section className="why">
        <h1>Почему именно мы</h1>
      </section>
    </>
  );
}

export default MainPage;
