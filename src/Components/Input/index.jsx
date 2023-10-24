import React from "react";

export default function Input({
  id,
  type,
  name,
  placeholder = "",
  containerClass,
  labelClass,
  inputClass,
  onChange,
  onFocus = () => {},
  onBlur = () => {},
  inputChebox = false,
  checked = false,
}) {
  return (
    <>
      {!inputChebox ? (
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
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      ) : (
        <div>
          <input
            type="checkbox"
            id={id}
            className={inputClass}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            checked={checked}
          />

          <label htmlFor={id} className={labelClass}>
            {name}
          </label>
        </div>
      )}
    </>
  );
}
