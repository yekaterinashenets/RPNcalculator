const { errors } = require("../constants");
const { test } = require("../helpers");
const convertToRPN = require("./index");

const testConvertToRPN = test(convertToRPN);

it("should properly convert when adding", () => {
  testConvertToRPN("8 7 +", "8 + 7");
});
it("should properly convert when adding multiple values", () => {
  testConvertToRPN("99 11 + 8 7 + +", "99 + 11 + (8 + 7)");
});

it("should properly convert when subtracting", () => {
  testConvertToRPN("8 3 -", "8 - 3");
});
it("should properly convert when subtracting multiple values", () => {
  testConvertToRPN("33 3 - 10 6 - -", "33 - 3 - (10 - 6)");
});

it("should properly convert when multiplying", () => {
  testConvertToRPN("4 7 *", "4 * 7");
});

it("should properly convert when multiplying multiple values", () => {
  testConvertToRPN("4 7 * 5 2 * *", "4 * 7 * (5 * 2)");
});

it("should properly convert when dividing", () => {
  testConvertToRPN("36 9 /", "36 / 9");
});
it("should properly convert when dividing multiple values", () => {
  testConvertToRPN("90 3 / 30 5 / /", "90 / 3 / (30 / 5)");
});

it("should properly convert when multiple operations", () => {
  testConvertToRPN(
    "15 7 1 1 + - / 3 * 2 1 1 + + -",
    "15 / (7 - (1 + 1)) * 3 - (2 + (1 + 1))"
  );
});

it("should cause error when double oparators", () => {
  testConvertToRPN(
    "15 7 1 1 + - / 3 * * 2 1 1 + + -",
    errors.BAD_SEQUENCE_ERROR
  );
});

it("should cause error when restricted symbols", () => {
  testConvertToRPN("15 7 1 1 + - / 3 $ 2 1 1 + + -", errors.BAD_SEQUENCE_ERROR);
});

it("should cause error when passing non-string arguments", () => {
  testConvertToRPN(123, errors.TYPE_ERROR);
});

it("should cause error when passing invalid string", () => {
  testConvertToRPN("a b s d", errors.INVALID_INPUT);
});
