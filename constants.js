const errors = {
  INVALID_INPUT: new Error(
    "Input string should contain numbers, operators and parentheses separated by space"
  ),
  TYPE_ERROR: new TypeError("Strings only are accepted"),
  BAD_SEQUENCE_ERROR: new Error("Bad Sequence Error"),
  UNCERTAINTY: new Error("Uncertainty was gotten when calculating")
};

module.exports = { errors };
