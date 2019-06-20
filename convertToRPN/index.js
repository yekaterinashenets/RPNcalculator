const { operatorsPrecedences, errors } = require("../constants");
const { getStackTop } = require("../helpers");
const { isNumeric, isString, isValidCharacters } = require("../validators");

const convertToRPN = exp => {
  if (!isString(exp)) {
    return errors.TYPE_ERROR;
  }

  if (!isValidCharacters(exp)) {
    return errors.INVALID_INPUT;
  }

  try {
    eval(exp);
  } catch (error) {
    return errors.BAD_SEQUENCE_ERROR;
  }

  let resultStack = [];

  return exp
    .split(" ")
    .reduce((output, character) => {
      if (isNumeric(character)) {
        output.push(character);
      }

      if (character in operatorsPrecedences) {
        while (
          getStackTop(resultStack) in operatorsPrecedences &&
          operatorsPrecedences[character] <=
            operatorsPrecedences[getStackTop(resultStack)]
        ) {
          output.push(resultStack.pop());
        }
        resultStack.push(character);
      }

      if (character == "(") {
        resultStack.push(character);
      }

      if (character == ")") {
        while (getStackTop(resultStack) != "(") {
          output.push(resultStack.pop());
        }
        resultStack.pop();
      }

      return output;
    }, [])
    .concat(resultStack.reverse())
    .join(" ");
};

module.exports = convertToRPN;
