import "./index.css";
import React from "react";

export default function Input({
  id,
  type,
  name,
  placeholder,
  containerClass,
  labelClass,
  inputClass,
}) {
  return (
    <>
      <div className={containerClass}>
        <label htmlFor={id} className={labelClass}>
          {name}
        </label>

        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={inputClass}
        />
      </div>
    </>
  );
}
