const fs = require("fs");

const numbers = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((line) => parseInt(line));

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

console.log(increases);
