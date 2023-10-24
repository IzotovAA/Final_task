import React from "react";

export default function Button({
  name,
  onClick = () => {},
  className,
  btnType = "button",
  disabled = false,
}) {
  return (
    <button
      className={className}
      onClick={onClick}
      type={btnType}
      disabled={disabled}
    >
      {name}
    </button>
  );
}
