const fs = require("fs");
const _ = require("lodash");

const parseInput = (filename) => {
  const lines = fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((line) => [...line]);
  return lines;
};

const getFirstIllegalCharacter = (line) => {
  const stack = [];

  for (const char of line) {
    if (char === "(" || char === "[" || char === "{" || char === "<")
      stack.push(char);
    else if (char === ")" && stack.pop() !== "(") return ")";
    else if (char === "]" && stack.pop() !== "[") return "]";
    else if (char === "}" && stack.pop() !== "{") return "}";
    else if (char === ">" && stack.pop() !== "<") return ">";
  }
  return "";
};

const getTotalSyntaxErrorScore = (illegalCharacters) => {
  const characterToPoints = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  const totalSyntaxErrorScore = _.sum(
    illegalCharacters.map(
      (illegalCharacter) => characterToPoints[illegalCharacter]
    )
  );

  return totalSyntaxErrorScore;
};

const filename = process.argv.slice(2)[0];
const lines = parseInput(filename);
const illegalCharacters = lines
  .map((line) => getFirstIllegalCharacter(line))
  .filter((firstIllegalCharacter) => firstIllegalCharacter);
const totalSyntaxErrorScore = getTotalSyntaxErrorScore(illegalCharacters);
console.log(totalSyntaxErrorScore);
