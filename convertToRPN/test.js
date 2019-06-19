const { errors } = require("../constants");
const convertToRPN = require("./index");

const test = (expression, expectedResult) => {
  var result = convertToRPN(expression);
  if (result !== expectedResult) {
    throw new Error(`Expected ${expectedResult}, but got ${result}`);
  }
};

it("should properly convert when adding", () => {
  test("8 7 +", "8 + 7");
});
it("should properly convert when adding multiple values", () => {
  test("99 11 + 8 7 + +", "99 + 11 + (8 + 7)");
});

it("should properly convert when subtracting", () => {
  test("8 3 -", "8 - 3");
});
it("should properly convert when subtracting multiple values", () => {
  test("33 3 - 10 6 - -", "33 - 3 - (10 - 6)");
});

it("should properly convert when multiplying", () => {
  test("4 7 *", "4 * 7");
});

it("should properly convert when multiplying multiple values", () => {
  test("4 7 * 5 2 * *", "4 * 7 * (5 * 2)");
});

it("should properly convert when dividing", () => {
  test("36 9 /", "36 / 9");
});
it("should properly convert when dividing multiple values", () => {
  test("90 3 / 30 5 / /", "90 / 3 / (30 / 5)");
});

it("should properly convert when multiple operations", () => {
  test(
    "15 7 1 1 + - / 3 * 2 1 1 + + -",
    "15 / (7 - (1 + 1)) * 3 - (2 + (1 + 1))"
  );
});

it("should cause error when double oparators", () => {
  test("15 7 1 1 + - / 3 * * 2 1 1 + + -", errors.BAD_SEQUENCE_ERROR);
});

it("should cause error when restricted symbols", () => {
  test("15 7 1 1 + - / 3 $ 2 1 1 + + -", errors.BAD_SEQUENCE_ERROR);
});

it("should cause error when passing non-string arguments", () => {
  test(123, errors.TYPE_ERROR);
});

it("should cause error when passing invalid string", () => {
  test("a b s d", errors.INVALID_INPUT);
});
