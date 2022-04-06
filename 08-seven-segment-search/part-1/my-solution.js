const fs = require("fs");

const parseInputFile = (filePath) => {
  const arrayOutputValues = fs
    .readFileSync(filePath)
    .toString()
    .split("\n")
    .map((values) => values.split("|")[1].trim().split(" "))
    .flat();

  return arrayOutputValues
}

const myAlgorithm = arrayOutputValues => {
  const targetLengths = [2, 3, 4, 7];

  const numberTargetDigitsInOutputValues = arrayOutputValues.filter((value) =>
    targetLengths.includes(value.length)
  ).length;

  return numberTargetDigitsInOutputValues
}

const mySolution = filePath => {
  const arrayOutputValues = parseInputFile(filePath);
  const numberTargetDigitsInOutputValues = myAlgorithm(arrayOutputValues)
  return numberTargetDigitsInOutputValues
}

module.exports = mySolution
