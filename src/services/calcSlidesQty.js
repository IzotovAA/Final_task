export default function calcSlidesQty(width, page) {
  if (page === "main") {
    if (width >= 1400) return 3;
    if (width < 1400 && width > 950) return 2;
    if (width <= 950) return 1;
  } else if (page === "search-result") {
    if (width > 1500) return 9;
    if (width > 1300 && width <= 1500) return 8;
    if (width <= 1300 && width > 1100) return 7;
    if (width <= 1100 && width > 900) return 6;
    if (width <= 900 && width > 750) return 5;
    if (width <= 750 && width > 650) return 4;
    if (width <= 650 && width > 500) return 3;
    if (width <= 500) return 1;
  }
}
