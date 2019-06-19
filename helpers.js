const test = methodToTest => (expression, expectedResult) => {
  var result = methodToTest(expression);
  if (result !== expectedResult) {
    throw new Error(`Expected ${expectedResult}, but got ${result}`);
  }
};

module.exports = {
  test
};
