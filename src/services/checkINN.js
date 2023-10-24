const checkDigit = function (inn, coefficients) {
  var n = 0;
  for (let i in coefficients) {
    n += coefficients[i] * inn[i];
  }
  return parseInt((n % 11) % 10);
};

export default function checkINN(inn) {
  const result = { result: false };

  if (typeof inn === "number") {
    inn = inn.toString();
  } else if (typeof inn !== "string") {
    inn = "";
  }
  if (!inn.length) {
    result.code = 1;
    result.message = "ИНН пуст";
  } else if (/[^0-9]/.test(inn)) {
    result.code = 2;
    result.message = "ИНН может состоять только из цифр";
  } else if ([10].indexOf(inn.length) === -1) {
    result.code = 3;
    result.message = "ИНН может состоять только из 10 цифр";
  } else {
    const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);

    if (n10 === parseInt(inn[9])) {
      result.result = true;
    }
  }

  if (!result.result) {
    result.code = 4;
    result.message = "Неправильное контрольное число";
  }

  return result;
}
