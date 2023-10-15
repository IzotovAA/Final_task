import React from "react";

export default function Button({
  name,
  onClick,
  className,
  btnType = "button",
}) {
  return (
    <button className={className} onClick={onClick} type={btnType}>
      {name}
    </button>
  );
}
