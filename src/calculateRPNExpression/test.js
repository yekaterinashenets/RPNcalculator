const { errors } = require("../constants");
const { test } = require("../helpers");
const calculateRPNExpression = require("./index");

const testCalculateRPNExpression = test(calculateRPNExpression);

it("should properly calculate when adding", () => {
  testCalculateRPNExpression("8 7 +", 15);
});
it("should properly calculate when adding multiple values", () => {
  testCalculateRPNExpression("99 11 + 8 7 + +", 125);
});

it("should properly calculate when subtracting", () => {
  testCalculateRPNExpression("8 3 -", 5);
});
it("should properly calculate when subtracting multiple values", () => {
  testCalculateRPNExpression("33 3 - 10 6 - -", 26);
});

it("should properly calculate when multiplying", () => {
  testCalculateRPNExpression("4 7 *", 28);
});

it("should properly calculate when multiplying multiple values", () => {
  testCalculateRPNExpression("4 7 * 5 2 * *", 280);
});

it("should properly calculate when dividing", () => {
  testCalculateRPNExpression("36 9 /", 4);
});
it("should properly calculate when dividing multiple values", () => {
  testCalculateRPNExpression("90 3 / 30 5 / /", 5);
});

it("should properly calculate when multiple operations", () => {
  testCalculateRPNExpression("15 7 1 1 + - / 3 * 2 1 1 + + -", 5);
});

it("should cause error when passing invalid string", () => {
  testCalculateRPNExpression("356 3 + + - 5  9 g", errors.INVALID_INPUT);
});

it("should cause error when passing non-string arguments", () => {
  testCalculateRPNExpression(123, errors.TYPE_ERROR);
});

it("should cause exception when passing '0 0 /'", () => {
  testCalculateRPNExpression("0 0 /", errors.UNCERTAINTY);
});

it("should cause error when expression is not correct", () => {
  testCalculateRPNExpression(
    "15 7 1 1 + - / 3 * * 2 1 1 + + -",
    errors.BAD_SEQUENCE_ERROR
  );
});

it("should cause error when uncertainty", () => {
  testCalculateRPNExpression("0 0 /", errors.UNCERTAINTY);
});
