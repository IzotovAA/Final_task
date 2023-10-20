import React from "react";
import "./index.css";
import Button from "../Button";

export default function UserInfo({ name, avatar, onClick, className }) {
  return (
    <>
      <div className={className}>
        <div className="userName-container">
          <p>{name}</p>
          <Button name="Выйти" onClick={onClick} className="userName-btn" />
        </div>
        <img src={avatar} alt="avatar" />
      </div>
    </>
  );
}
