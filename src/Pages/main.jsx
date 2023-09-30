import React from "react";
import "./index.css";
import Button from "../Components/Button";
import searchPic from "../img/search.svg";
import Card from "../Components/Card";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import card1 from "../img/card-img-1.svg";
import card2 from "../img/card-img-2.svg";
import card3 from "../img/card-img-3.svg";
import whyPic from "../img/why.svg";
import arrowLeft from "../img/arrow-left.svg";
import arrowRight from "../img/arrow-right.svg";

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
        <img src={searchPic} alt="search-pic" className="search-picture" />
      </section>

      <section className="why">
        <h1>Почему именно мы</h1>

        <div className="why-slider-container">
          <CarouselProvider
            naturalSlideWidth={200}
            naturalSlideHeight={130}
            totalSlides={6}
            visibleSlides={3}
            infinite={true}
          >
            <Slider className="why-slider">
              <Slide index={0}>
                <Card
                  image={card1}
                  text="Высокая и оперативная скорость обработки заявки"
                  className="why-slider__item"
                />
              </Slide>
              <Slide index={1}>
                <Card
                  image={card2}
                  text="Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
                  className="why-slider__item"
                />
              </Slide>
              <Slide index={2}>
                <Card
                  image={card3}
                  text="Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
                  className="why-slider__item"
                />
              </Slide>
              <Slide index={3}>
                <Card
                  image={card1}
                  text="Высокая и оперативная скорость обработки заявки. Копия для примера работы слайдера"
                  className="why-slider__item"
                />
              </Slide>
              <Slide index={4}>
                <Card
                  image={card2}
                  text="Огромная комплексная база данных, обеспечивающая объективный ответ на запрос. Копия для примера работы слайдера"
                  className="why-slider__item"
                />
              </Slide>
              <Slide index={5}>
                <Card
                  image={card3}
                  text="Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству. Копия для примера работы слайдера"
                  className="why-slider__item"
                />
              </Slide>
            </Slider>
            <ButtonBack className="arrow-back">
              <img src={arrowLeft} alt="back" />
            </ButtonBack>
            <ButtonNext className="arrow-next">
              <img src={arrowRight} alt="next" />
            </ButtonNext>
          </CarouselProvider>
        </div>

        <img src={whyPic} alt="why-pic" className="why-picture" />
      </section>
    </>
  );
}

export default MainPage;
