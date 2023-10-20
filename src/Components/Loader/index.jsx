import React from "react";
import "./index.css";
import loader from "../../img/loader.svg";

export default function Loader() {
  return (
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  );
}
