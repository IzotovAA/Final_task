import "./index.css";
import React, { useEffect, useRef, useState } from "react";
import searchPic from "../../img/search-result.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { documents } from "../../store/reducers/userSlice";
import HistogramsCard from "../../Components/Cards/HistogramsCard";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import arrowLeft from "../../img/arrow-left.svg";
import arrowRight from "../../img/arrow-right.svg";
import Loader from "../../Components/Loader";
import xmlProcessing from "../../services/xmlProcessing";
import ArticleCard from "../../Components/Cards/ArticleCard";
import Button from "../../Components/Button";

// доработать приватность страниц если пользователь не авторизован
export default function SearchResultPage({ auth }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestHistogramsStatus = useSelector(
    (state) => state.user.requestHistogramsStatus
  );
  const requestPublicationsStatus = useSelector(
    (state) => state.user.requestPublicationsStatus
  );
  const requestDocumentsStatus = useSelector(
    (state) => state.user.requestDocumentsStatus
  );

  const histograms = useSelector((state) => state.user.histograms);
  const publicationsId = useSelector((state) => state.user.publicationsId);
  const documentsArr = useSelector((state) => state.user.documents);
  const [documentsForRender, setDocumentsForRender] = useState(
    documentsArr.length > 0 ? documentsArr.slice(0, 10) : []
  );
  const [totalQty, setTotalQty] = useState(0);
  const [moreBtnClass, setMoreBtnClass] = useState(
    "search-result-documents-btn"
  );
  // const [renderIndex, setRenderIndex] = useState(20)
  let renderIndex = useRef(10);
  let slideIndex = 0;
  let riskIndex = 0;
  let cardIndex = 1;

  // console.log("histograms", histograms);
  console.log("requestDocumentsStatus", requestDocumentsStatus);
  console.log("documentsArr", documentsArr);
  console.log("documentsForRender", documentsForRender);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth]);

  useEffect(() => {
    if (requestHistogramsStatus === "complete") {
      let qty = 0;
      histograms[0].data.map((elem) => {
        qty += elem.value;
      });

      setTotalQty(qty);
    } else if (requestHistogramsStatus === null) {
      navigate("/");
    }
  }, [requestHistogramsStatus]);

  useEffect(() => {
    console.log("useEffect зависит от requestPublicationsStatus");
    if (requestPublicationsStatus === "complete") {
      console.log("publicationsId", publicationsId);
      const requestDocumentsObj = { ids: [] };
      publicationsId.forEach((element) => {
        requestDocumentsObj.ids.push(element.encodedId);
      });
      console.log("requestDocumentsObj", requestDocumentsObj);
      dispatch(documents(JSON.stringify(requestDocumentsObj)));
    }
  }, [requestPublicationsStatus]);

  useEffect(() => {
    if (documentsArr.length) {
      setDocumentsForRender(documentsArr.slice(0, 10));
    }
  }, [requestDocumentsStatus]);

  useEffect(() => {
    if (requestDocumentsStatus && renderIndex.current >= documentsArr.length) {
      setMoreBtnClass("search-result-documents-btn hidden");
    } else setMoreBtnClass("search-result-documents-btn");
  }, [renderIndex.current]);

  return (
    <>
      <section className="search-result">
        <div className="search-result-info-container">
          <div className="search-result-info-text">
            <h1>
              Ищем. Скоро <br />
              будут результаты
            </h1>
            <p>
              Поиск может занять некоторое время, <br />
              просим сохранять терпение.
            </p>
          </div>

          <img src={searchPic} alt="pic" />
        </div>

        <div className="search-result-histograms-container">
          <h2>Общая сводка</h2>
          <p>Найдено {totalQty} вариантов</p>
          <div className="search-result-histograms-slider-container">
            <div className="search-result-histograms-slider-header">
              <div>Период</div>
              <div>Всего</div>
              <div>Риски</div>
            </div>
            <div className="search-result-histograms-slider-body">
              <CarouselProvider
                naturalSlideWidth={138}
                naturalSlideHeight={158}
                totalSlides={histograms[0] ? histograms[0].data.length : 0}
                visibleSlides={8}
                infinite={false}
              >
                {requestHistogramsStatus === "complete" ? (
                  <Slider className="search-result-histograms-slider">
                    {histograms[0].data.map((elem) => {
                      let risk = histograms[1].data[riskIndex].value;
                      riskIndex++;

                      return (
                        <Slide index={slideIndex++} key={slideIndex++}>
                          <HistogramsCard
                            classNameContainer="search-result-histograms-slider-item-container"
                            className="search-result-histograms-slider__item"
                            date={elem.date.slice(0, 10)}
                            total={elem.value}
                            risks={risk}
                          />
                        </Slide>
                      );
                    })}
                  </Slider>
                ) : (
                  <div className="search-result-histograms-slider--loader">
                    <Loader />
                    <p>Загружаем данные</p>
                  </div>
                )}
                <ButtonBack className="search-result-histograms-slider-arrow-back">
                  <img src={arrowLeft} alt="back" />
                </ButtonBack>
                <ButtonNext className="search-result-histograms-slider-arrow-next">
                  <img src={arrowRight} alt="next" />
                </ButtonNext>
              </CarouselProvider>
            </div>
          </div>
        </div>

        {/* реализовать ленивую подгрузку карточек (по 10шт.) по клику кнопки*/}
        <div className="search-result-documents-container">
          <h2>Список документов</h2>
          <div className="search-result-documents-cards">
            {requestDocumentsStatus === "complete" ? (
              documentsForRender.map((elem) => {
                return (
                  <ArticleCard
                    containerClass="article-card-container"
                    publicationContainerClass="article-card-publication-container"
                    publicationDateClass="article-card-publication-date"
                    publicationSourceClass="article-card-publication-source"
                    titleClass="article-card-title"
                    attributeClass="article-card-attribute"
                    textClass="article-card-text"
                    buttonContainerClass="article-card-button-container"
                    buttonName="Читать в источнике"
                    buttonClass="article-card-button-btn"
                    wordCountClass="article-card-button-wordcount"
                    articleObj={xmlProcessing(elem)}
                    // cardKey={cardIndex}
                    key={cardIndex++}
                  />
                );
              })
            ) : (
              <div>Ошибка. Массив документов отсутствует</div>
            )}
          </div>
          {requestDocumentsStatus ? (
            <Button
              name="Показать больше"
              className={moreBtnClass}
              onClick={() => {
                renderIndex.current += 10;
                console.log("renderIndex", renderIndex.current);
                setDocumentsForRender(
                  documentsArr.slice(0, renderIndex.current)
                );
              }}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}
