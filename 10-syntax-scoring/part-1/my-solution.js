const fs = require("fs");
const _ = require("lodash");

const parseInputFile = (filePath) => {
  const lines = fs
    .readFileSync(filePath)
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

const mySolution = filePath => {
  const lines = parseInputFile(filePath);
  const illegalCharacters = lines
    .map((line) => getFirstIllegalCharacter(line))
    .filter((firstIllegalCharacter) => firstIllegalCharacter);
  const totalSyntaxErrorScore = getTotalSyntaxErrorScore(illegalCharacters);
  return totalSyntaxErrorScore
}

module.exports = mySolution
