export default function calcSlidesQty(width) {
  if (width >= 1400) return 3;
  if (width < 1400 && width > 950) return 2;
  if (width <= 950) return 1;
}
