const test = methodToTest => (expression, expectedResult) => {
  var result = methodToTest(expression);
  if (result !== expectedResult) {
    throw new Error(`Expected ${expectedResult}, but got ${result}`);
  }
};

const getStackTop = stack => stack[stack.length - 1];

module.exports = {
  test,
  getStackTop
};
