import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import Button from "../../Components/Button";
import searchPic from "../../img/search.svg";
import WhyCard from "../../Components/Cards/WhyCard";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import card1 from "../../img/card-img-1.svg";
import card2 from "../../img/card-img-2.svg";
import card3 from "../../img/card-img-3.svg";
import whyPic from "../../img/why.svg";
import arrowLeft from "../../img/arrow-left.svg";
import arrowRight from "../../img/arrow-right.svg";
import RatesCard from "../../Components/Cards/RatesCard";
import beginner from "../../img/beginner.svg";
import pro from "../../img/pro.svg";
import buisness from "../../img/business.svg";
import calcSlidesQty from "../../services/calcSlidesQty";
import { AppContext } from "../../App";

export default function MainPage({ auth, onClick }) {
  const { screenWidth } = useContext(AppContext);
  const [slidesQty, setSlidesQty] = useState(calcSlidesQty(screenWidth));

  useEffect(() => {
    setSlidesQty(calcSlidesQty(screenWidth, "main"));
  }, [screenWidth]);

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
          {screenWidth <= 450 ? (
            <p>
              Комплексный анализ публикаций, получение данных в формате PDF на
              электронную почту.
            </p>
          ) : (
            <p>
              Комплексный анализ публикаций, получение данных <br />в формате
              PDF на электронную почту.
            </p>
          )}

          {auth ? (
            <Button
              name="Запросить данные"
              onClick={onClick}
              className="search-btn"
            />
          ) : null}
        </div>
        <img src={searchPic} alt="search-pic" className="search-picture" />
      </section>

      <section className="why">
        {screenWidth <= 500 ? (
          <h1>
            Почему <br /> именно мы
          </h1>
        ) : (
          <h1>Почему именно мы</h1>
        )}

        <div className="why-slider-container">
          <CarouselProvider
            naturalSlideWidth={400}
            naturalSlideHeight={225}
            totalSlides={6}
            visibleSlides={slidesQty}
            infinite={true}
          >
            <Slider className="why-slider">
              <Slide index={0}>
                <WhyCard
                  image={card1}
                  text="Высокая и оперативная скорость обработки заявки"
                  className="why-slider__item"
                />
              </Slide>
              <Slide index={1}>
                <WhyCard
                  image={card2}
                  text="Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
                  className="why-slider__item"
                />
              </Slide>
              <Slide index={2}>
                <WhyCard
                  image={card3}
                  text="Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
                  className="why-slider__item"
                />
              </Slide>
              <Slide index={3}>
                <WhyCard
                  image={card1}
                  text="Высокая и оперативная скорость обработки заявки. Копия для примера работы слайдера"
                  className="why-slider__item"
                />
              </Slide>
              <Slide index={4}>
                <WhyCard
                  image={card2}
                  text="Огромная комплексная база данных, обеспечивающая объективный ответ на запрос. Копия для примера работы слайдера"
                  className="why-slider__item"
                />
              </Slide>
              <Slide index={5}>
                <WhyCard
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

      <section className="rates">
        <h1>наши тарифы</h1>
        <div className="rates-cards-container">
          <RatesCard
            image={beginner}
            className="rates-card"
            cardName="Beginner"
            cardNameText="Для небольшого исследования"
            currentPrize="799 ₽"
            lastPrize="1200 ₽"
            prizeText="или 150 ₽/мес. при рассрочке на 24 мес."
            ratesItems={[
              "Безлимитная история запросов",
              "Безопасная сделка",
              "Поддержка 24/7",
            ]}
            buttonsParams={{
              name: "Подробнее",
              className: "rates-card-btn",
            }}
            active={auth ? true : false}
          />
          <RatesCard
            image={pro}
            className="rates-card"
            cardName="Pro"
            cardNameText="Для HR и фрилансеров"
            currentPrize="1299 ₽"
            lastPrize="2600 ₽"
            prizeText="или 279 ₽/мес. при рассрочке на 24 мес."
            ratesItems={[
              "Все пункты тарифа Beginner",
              "Экспорт истории",
              "Рекомендации по приоритетам",
            ]}
            buttonsParams={{
              name: "Подробнее",
              className: "rates-card-btn",
            }}
            active={false}
          />
          <RatesCard
            image={buisness}
            className="rates-card"
            cardName="Business"
            cardNameText="Для корпоративных клиентов"
            currentPrize="2379 ₽"
            lastPrize="3700 ₽"
            prizeText=""
            ratesItems={[
              "Все пункты тарифа Pro",
              "Безлимитное количество запросов",
              "Приоритетная поддержка",
            ]}
            buttonsParams={{
              name: "Подробнее",
              className: "rates-card-btn",
            }}
            active={false}
          />
        </div>
      </section>
    </>
  );
}
