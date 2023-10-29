import React, { useContext } from "react";
import "./index.css";
import Button from "../../Button";
import checkMark from "../../../img/check-mark.svg";
import { AppContext } from "../../../App";

export default function RatesCard({
  image,
  className,
  cardName,
  cardNameText,
  currentPrize,
  lastPrize,
  prizeText = "",
  ratesItems,
  buttonsParams,
  active = false,
}) {
  const { screenWidth } = useContext(AppContext);

  let currentRate = (
    <div className="notactive-rate">
      <p>Текущий тариф</p>
    </div>
  );
  let cardClass = className;
  let headerClass = `card-header ${cardName.toLowerCase()}`;
  let buttonName = buttonsParams.name;
  let buttonClass = buttonsParams.className;
  let i = 0;

  if (active) {
    currentRate = (
      <div className="active-rate">
        <p>Текущий тариф</p>
      </div>
    );
    cardClass = `${cardClass} ${cardClass}--${cardName.toLowerCase()}`;
    buttonName = "Перейти в личный кабинет";
    buttonClass = buttonsParams.className + "--active";
  }

  return (
    <div className={cardClass}>
      <div className={headerClass}>
        {screenWidth <= 500 ? (
          <>
            <div className="card-header-info">
              <h2>{cardName}</h2>
              <img src={image} alt="card-pic" />
            </div>
            <div>
              <p>{cardNameText}</p>
            </div>
          </>
        ) : (
          <>
            <div className="card-header-info">
              <h2>{cardName}</h2>
              <p>{cardNameText}</p>
            </div>
            <div>
              <img src={image} alt="card-pic" />
            </div>
          </>
        )}
      </div>
      <div className="card-body">
        <div className="card-body-prize-container">
          {currentRate}
          <div className="card-body-prize">
            <h2 className="prize-current">{currentPrize}</h2>
            <del className="prize-last">{lastPrize}</del>
          </div>
          <p>{prizeText}</p>
        </div>
        <div className="rates-details">
          <p>В тариф входит:</p>

          <ul className="rates-details-list">
            {ratesItems.map((item) => {
              i++;
              return (
                <li key={i} className="rates-details-list__item">
                  <img src={checkMark} alt="checkMark" />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <Button
          name={buttonName}
          onClick={buttonsParams.onClick}
          className={buttonClass}
        />
      </div>
    </div>
  );
}
