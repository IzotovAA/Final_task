import React from "react";
import "./index.css";

export default function Checkbox({
  id,
  inputClass,
  checked,
  labelClass,
  text,
}) {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        className={inputClass}
        defaultChecked={checked}
      />
      <label htmlFor={id} className={labelClass}>
        {text}
      </label>
    </div>
  );
}
