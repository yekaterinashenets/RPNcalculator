const convertToRPN = require("./src/convertToRPN");
const calculateRPNExpression = require("./src/calculateRPNExpression");

const readline = require("readline");
const fs = require("fs");

const initApp = () => {
  const args = process.argv.slice(2);
  const fileName = args[0];

  const rl = readline.createInterface({
    input: fs.createReadStream(fileName)
  });

  rl.on("line", line => {
    const convertedtoRPN = convertToRPN(line);
    const calculatedExpression = calculateRPNExpression(convertedtoRPN);
    console.log(`readed line: ${line}`);
    console.log(`line converted to RPN: ${convertedtoRPN}`);
    console.log(`calculated expression: ${calculatedExpression}\n`);
  });
};

initApp();
