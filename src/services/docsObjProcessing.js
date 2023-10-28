export default function docsObjProcessing(array) {
  const result = [];
  let i = 0,
    j = 0,
    k = 100;

  console.log("k <= array.length", k <= array.length);

  while (k - 100 <= array.length && i <= 9) {
    console.log("while");

    result[i] = { ids: array.slice(j, k) };

    i++;
    j += 100;
    k += 100;
  }

  console.log("result", result);
  return result;
}
