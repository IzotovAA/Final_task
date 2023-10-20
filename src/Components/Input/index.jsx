import React from "react";

export default function Input({
  id,
  type,
  name,
  placeholder,
  containerClass,
  labelClass,
  inputClass,
  onChange,
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
          onChange={onChange}
        />
      </div>
    </>
  );
}
