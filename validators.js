const isNumeric = str => !isNaN(parseFloat(str)) && isFinite(str);

const isString = str => typeof str === "string" || str instanceof String;

const isValidCharacters = str => /^\d+(\s[\d\+\-\*\/]+)*$/.test(str);

const isUncertainty = str => str === "0 0 /";

module.exports = {
  isNumeric,
  isString,
  isValidCharacters,
  isUncertainty
};
