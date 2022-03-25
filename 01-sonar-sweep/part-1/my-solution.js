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

  while (index2 <= numbers.length - 1) {
    const firstElement = numbers[index1];
    const secondElement = numbers[index2];
    if (secondElement > firstElement) increases++;
    index1++;
    index2++;
  }

  return increases
}

module.exports = {
  parseInputFile,
  myAlgorithm
};
