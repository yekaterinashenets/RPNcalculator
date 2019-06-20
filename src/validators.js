const isNumeric = str => !isNaN(parseFloat(str)) && isFinite(str);

const isOperator = c => "^*/+-".indexOf(c) !== -1;

const isString = str => typeof str === "string" || str instanceof String;

const isValidCharacters = str =>
  /^(\(\s)?\d+(\s[\(\d\+\-\*\/\)\s]+)*$/.test(str);

const isUncertainty = str => str === "0 0 /";

module.exports = {
  isNumeric,
  isOperator,
  isString,
  isValidCharacters,
  isUncertainty
};
