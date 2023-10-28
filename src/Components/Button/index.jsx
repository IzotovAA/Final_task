import React from "react";

export default function Button({
  name,
  onClick = () => {
    console.log("клик");
  },
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
