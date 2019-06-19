const { operations, errors } = require("../constants");
const {
  isNumeric,
  isString,
  isValidCharacters,
  isUncertainty
} = require("../validators");

const calculateRPNExpression = exp => {
  if (!isString(exp)) {
    return errors.TYPE_ERROR;
  }

  if (!isValidCharacters(exp)) {
    return errors.INVALID_INPUT;
  }

  if (isUncertainty(exp)) {
    return errors.UNCERTAINTY;
  }

  const resultStack = [];
  const expCharacters = exp.split(" ");

  for (let i = 0; i < expCharacters.length; i++) {
    if (isNumeric(expCharacters[i])) {
      resultStack.push(expCharacters[i]);
    } else {
      const a = resultStack.pop();
      const b = resultStack.pop();
      switch (expCharacters[i]) {
        case operations.ADDING:
          resultStack.push(parseInt(a) + parseInt(b));
          break;
        case operations.SUBTRACTION:
          resultStack.push(parseInt(b) - parseInt(a));
          break;
        case operations.MULTIPLICATION:
          resultStack.push(parseInt(a) * parseInt(b));
          break;
        case operations.DIVISION:
          resultStack.push(parseInt(b) / parseInt(a));
          break;
        default:
          break;
      }
    }
  }
  if (isNaN(resultStack[0])) {
    return errors.BAD_SEQUENCE_ERROR;
  }
  return resultStack.pop();
};

module.exports = calculateRPNExpression;
