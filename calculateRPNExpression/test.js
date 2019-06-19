const { errors } = require("../constants");
const calculateRPNExpression = require("./index");

const test = (expression, expectedResult) => {
  var result = calculateRPNExpression(expression);
  if (result !== expectedResult) {
    throw new Error(`Expected ${expectedResult}, but got ${result}`);
  }
};

it("should properly calculate when adding", () => {
  test("8 7 +", 15);
});
it("should properly calculate when adding multiple values", () => {
  test("99 11 + 8 7 + +", 125);
});

it("should properly calculate when subtracting", () => {
  test("8 3 -", 5);
});
it("should properly calculate when subtracting multiple values", () => {
  test("33 3 - 10 6 - -", 26);
});

it("should properly calculate when multiplying", () => {
  test("4 7 *", 28);
});

it("should properly calculate when multiplying multiple values", () => {
  test("4 7 * 5 2 * *", 280);
});

it("should properly calculate when dividing", () => {
  test("36 9 /", 4);
});
it("should properly calculate when dividing multiple values", () => {
  test("90 3 / 30 5 / /", 5);
});

it("should properly calculate when multiple operations", () => {
  test("15 7 1 1 + - / 3 * 2 1 1 + + -", 5);
});

it("should cause error when double oparators", () => {
  test("15 7 1 1 + - / 3 * * 2 1 1 + + -", errors.BAD_SEQUENCE_ERROR);
});

it("should cause error when restricted symbols", () => {
  test("15 7 1 1 + - / 3 $ 2 1 1 + + -", errors.BAD_SEQUENCE_ERROR);
});

it("should cause error when uncertainty", () => {
  test("0 0 /", errors.UNCERTAINTY);
});

it("should cause error when passing non-string arguments", () => {
  test(123, errors.TYPE_ERROR);
});

it("should cause error when passing invalid string", () => {
  test("a b s d", errors.INVALID_INPUT);
});
