const fs = require("fs");

const parseInputFile = (filePath) => {
  const instructions = fs
    .readFileSync(filePath)
    .toString()
    .split("\n")
    .map(instruction => {
      const command = instruction.split(" ")[0];
      const value = parseInt(instruction.split(" ")[1]);
      return [command, value]
    })

  return instructions
}

const myAlgorithm = (instructions) => {
  let horizontalPosition = 0;
  let depth = 0;

  instructions.forEach((instruction) => {
    const [command, value] = instruction
    if (command === "forward") horizontalPosition += value;
    else if (command === "down") depth += value;
    else if (command === "up") depth -= value;
  });

  return horizontalPosition * depth;
}

const mySolution = filePath => {
  const instructions = parseInputFile(filePath)
  const finalHorizontalPositionTimesFinalDepth = myAlgorithm(instructions)
  return finalHorizontalPositionTimesFinalDepth
}

module.exports = mySolution