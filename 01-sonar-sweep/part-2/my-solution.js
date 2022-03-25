const fs = require("fs");

const parseInputFile = (filePath) => {
  const numbers = fs
    .readFileSync(filePath)
    .toString()
    .split("\n")
    .map((line) => parseInt(line));

  return numbers
}

const myAlgorithm = (numbers) => {
  let increases = 0;
  let index1 = 0;
  let index2 = 1;

  while (index2 + 2 <= numbers.length - 1) {
    const firstWindow = numbers[index1] + numbers[index1 + 1] + numbers[index1 + 2];
    const secondWindow = numbers[index2] + numbers[index2 + 1] + numbers[index2 + 2];
    if (secondWindow > firstWindow) increases++;
    index1++;
    index2++;
  }

  return increases;
}

module.exports = {
  parseInputFile,
  myAlgorithm
};
