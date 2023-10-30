import React from "react";
import "./index.css";

export default function HistogramsCard({
  classNameContainer,
  className,
  date,
  total,
  risks,
}) {
  return (
    <div className={classNameContainer}>
      <div className={className}>
        <div>{date}</div>
        <div className={className + "-middle"}>{total}</div>
        <div>{risks}</div>
      </div>
      <span className="border-right-line"></span>
    </div>
  );
}
