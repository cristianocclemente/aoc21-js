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
  let aim = 0;
  let horizontalPosition = 0;
  let depth = 0;
  instructions.forEach((instruction) => {
    const [command, value] = instruction
    if (command === "down") aim += value;
    else if (command === "up") aim -= value;
    else if (command === "forward") {
      horizontalPosition += value;
      depth += aim * value;
    }
  });

  return horizontalPosition * depth
}

const mySolution = filePath => {
  const instructions = parseInputFile(filePath)
  const finalHorizontalPositionTimesFinalDepth = myAlgorithm(instructions)
  return finalHorizontalPositionTimesFinalDepth
}

module.exports = mySolution