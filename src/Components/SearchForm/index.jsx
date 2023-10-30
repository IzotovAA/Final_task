import Input from "../Input";
import "./index.css";
import Checkbox from "../Checkbox";
import Button from "../Button";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import checkINN from "../../services/checkINN";
import {
  histograms,
  publications,
  setDocumentsLimit,
  setEndDate,
  setInn,
  setStartDate,
} from "../../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import createRequestHistogramsObj from "../../services/createRequestHistogramsObj";
import { AppContext } from "../../App";

export default function SearchForm() {
  const { screenWidth } = useContext(AppContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inn = useSelector((state) => state.user.inn);
  const documentsLimit = useSelector((state) => state.user.documentsLimit);
  const startDate = useSelector((state) => state.user.startDate);
  const endDate = useSelector((state) => state.user.endDate);

  const [innError, setInnError] = useState(null);
  const [rangeError, setRangeError] = useState(null);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const submitBtn = document.querySelector(".search-form-checkbox-btn");
    const startInput = document.querySelector("#start-range");
    const endInput = document.querySelector("#end-range");
    const limitInput = document.querySelector("#doc-qty");
    const rangeDataReq = document.querySelector(".range-data");
    startInput.classList.remove("input-error");
    endInput.classList.remove("input-error");
    rangeDataReq.classList.remove("range-data-error");
    rangeDataReq.classList.add("range-data-ok");

    if (end.getTime() - start.getTime() < 0) {
      setRangeError(
        <div className="range-error">
          Дата начала должна быть раньше даты конца
        </div>
      );
      submitBtn.disabled = true;
      startInput.classList.add("input-error");
      endInput.classList.add("input-error");
      rangeDataReq.classList.add("range-data-error");
    }

    if (
      inn.length === 10 &&
      limitInput.value &&
      documentsLimit &&
      startDate &&
      endDate &&
      end.getTime() - start.getTime() > 0
    ) {
      submitBtn.disabled = false;
    } else submitBtn.disabled = true;
  }, [inn, documentsLimit, startDate, endDate]);

  const innHandler = (event) => {
    const innInput = document.querySelector("#inn");
    const innLabel = document.querySelector(".inn-label");

    setInnError(null);
    innInput.classList.remove("input-error");
    innLabel.classList.remove("inn-label-error");
    innLabel.classList.add("inn-label-ok");

    if (!/[^0-9]/.test(event.target.value)) {
      if (event.target.value.length <= 10) {
        dispatch(setInn(event.target.value));
      } else event.target.value = inn;
    } else event.target.value = inn;

    if (event.target.value.length === 10) {
      let check = checkINN(event.target.value);

      if (!check.result) {
        setInnError(<div className="inn-error">{check.message}</div>);

        innInput.classList.add("input-error");
        innLabel.classList.add("inn-label-error");
      }
    }
  };

  const documentsLimitHandler = (event) => {
    const submitBtn = document.querySelector(".search-form-checkbox-btn");
    if (
      parseInt(event.target.value) > 0 &&
      parseInt(event.target.value) <= 1000
    ) {
      dispatch(setDocumentsLimit(event.target.value));
    } else if (event.target.value === "") {
      event.target.value = "";
      dispatch(setDocumentsLimit(0));
      submitBtn.disabled = true;
    } else if (parseInt(event.target.value) <= 0) {
      dispatch(setDocumentsLimit(1));
      event.target.value = 1;
    } else if (parseInt(event.target.value) > 1000) {
      dispatch(setDocumentsLimit(1000));
      event.target.value = 1000;
    }
  };

  const startRangeHandler = (event) => {
    dispatch(setStartDate(event.target.value));
    setRangeError(null);
  };

  const endRangeHandler = (event) => {
    dispatch(setEndDate(event.target.value));
    setRangeError(null);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const requestHistogramsObj = createRequestHistogramsObj(
      startDate,
      endDate,
      inn,
      documentsLimit
    );

    dispatch(histograms(requestHistogramsObj));
    dispatch(publications(requestHistogramsObj));
    navigate("/datasearch/result");
  };

  return (
    <>
      <form className="search-form-container" onSubmit={submitHandler}>
        <div className="search-form-data">
          <Input
            id="inn"
            type="text"
            name="ИНН компании"
            placeholder="10 цифр"
            containerClass="inn-container"
            labelClass="inn-label inn-label-ok"
            inputClass="inn-input"
            onChange={innHandler}
          />

          {innError}

          <div className="tonality-container">
            <p>Тональность</p>
            <select className="tonality" name="tonality">
              <option className="tonality__item" value="Любая">
                Любая
              </option>
              <option className="tonality__item" value="Позитивная">
                Позитивная
              </option>
              <option className="tonality__item" value="Негативная">
                Негативная
              </option>
            </select>
          </div>

          <Input
            id="doc-qty"
            type="number"
            name="Количество документов в выдаче*"
            placeholder="От 1 до 1000"
            containerClass="doc-qty-container"
            labelClass="doc-qty-label"
            inputClass="doc-qty-input"
            onChange={documentsLimitHandler}
          />

          <div className="range-data-container">
            <p>
              Диапазон поиска<span className="range-data range-data-ok">*</span>
            </p>
            <div className="range-container">
              <Input
                id="start-range"
                type="text"
                name=""
                placeholder="Дата начала"
                containerClass="start-range-container"
                labelClass="start-range-label"
                inputClass="start-range-input"
                onChange={startRangeHandler}
                onFocus={() => {
                  document.querySelector("#start-range").type = "date";
                }}
                onBlur={() => {
                  document.querySelector("#start-range").type = "text";
                }}
              />
              <Input
                id="end-range"
                type="text"
                name=""
                placeholder="Дата конца"
                containerClass="end-range-container"
                labelClass="end-range-label"
                inputClass="end-range-input"
                onChange={endRangeHandler}
                onFocus={() => {
                  document.querySelector("#end-range").type = "date";
                }}
                onBlur={() => {
                  document.querySelector("#end-range").type = "text";
                }}
              />
            </div>

            {rangeError}
          </div>
        </div>

        {screenWidth <= 700 ? (
          <div className="search-form-checkbox-btn-container">
            <Button
              name="Поиск"
              className="search-form-checkbox-btn"
              btnType="submit"
              disabled={true}
            />
            <p>* Обязательные к заполнению поля</p>
          </div>
        ) : (
          <div className="search-form-checkbox-container">
            <Checkbox
              id="checkbox1"
              inputClass="search-form-checkbox-input"
              checked={true}
              fakeClass="search-form-checkbox-fake"
              labelClass="search-form-checkbox-label"
              text="Признак максимальной полноты"
            />

            <Checkbox
              id="checkbox2"
              inputClass="search-form-checkbox-input"
              checked={true}
              labelClass="search-form-checkbox-label"
              text="Упоминания в бизнес-контексте"
            />

            <Checkbox
              id="checkbox3"
              inputClass="search-form-checkbox-input"
              checked={true}
              labelClass="search-form-checkbox-label"
              text="Главная роль в публикации"
            />

            <Checkbox
              id="checkbox4"
              inputClass="search-form-checkbox-input"
              checked={false}
              labelClass="search-form-checkbox-label"
              text="Публикации только с риск-факторами"
            />

            <Checkbox
              id="checkbox5"
              inputClass="search-form-checkbox-input"
              checked={false}
              labelClass="search-form-checkbox-label"
              text="Включать технические новости рынков"
            />

            <Checkbox
              id="checkbox6"
              inputClass="search-form-checkbox-input"
              checked={true}
              labelClass="search-form-checkbox-label"
              text="Включать анонсы и календари"
            />

            <Checkbox
              id="checkbox7"
              inputClass="search-form-checkbox-input"
              checked={false}
              labelClass="search-form-checkbox-label"
              text="Включать сводки новостей"
            />

            <div className="search-form-checkbox-btn-container">
              <Button
                name="Поиск"
                className="search-form-checkbox-btn"
                btnType="submit"
                disabled={true}
              />
              <p>* Обязательные к заполнению поля</p>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
