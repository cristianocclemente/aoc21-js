const fs = require("fs");

const filename = process.argv.slice(2)[0];
const arrayOutputValues = fs
  .readFileSync(filename)
  .toString()
  .split("\n")
  .map((values) => values.split("|")[1].trim().split(" "))
  .flat();

const targetLengths = [2, 3, 4, 7];

const numberTargetDigitsInOutputValues = arrayOutputValues.filter((value) =>
  targetLengths.includes(value.length)
).length;

console.log(numberTargetDigitsInOutputValues);
