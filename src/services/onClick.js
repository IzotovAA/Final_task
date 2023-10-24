export function onClickBurger() {
  const body = document.body;
  const burger = document.querySelector(".burger");
  const popupBg = document.querySelector(".popup-bg");
  const popup = document.querySelector(".popup-container");

  if (popup.className.match("preload")) {
    popup.classList.remove("preload");
  }

  body.classList.toggle("fixed");
  burger.classList.toggle("burger-popup--close");
  burger.classList.toggle("burger-popup--open");
  popupBg.classList.toggle("popup-bg--hidden");
  popup.classList.toggle("popup--close");
  popup.classList.toggle("popup--open");
}

export function onClickAuthEnter(navigate) {
  navigate("/authenter");
}

export function onClickAuthReg(navigate) {
  navigate("/authreg");
}

export function onClickDataSearch(navigate) {
  navigate("/datasearch");
}
