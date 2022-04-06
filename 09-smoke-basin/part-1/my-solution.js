const fs = require("fs");
const _ = require("lodash");

const parseInputFile = (filePath) => {
  const floor = fs
    .readFileSync(filePath)
    .toString()
    .split("\n")
    .map((line) => [...line].map((char) => parseInt(char)));
  return floor;
};

const computeRiskLevel = (lowPoint) => lowPoint + 1;

const isLowerThanAdjacent = (floor, row, column) => {
  const center = floor[row][column];
  let up = 10;
  let down = 10;
  let left = 10;
  let right = 10;

  if (row - 1 >= 0) up = floor[row - 1][column];
  if (row + 1 <= floor.length - 1) down = floor[row + 1][column];
  if (column - 1 >= 0) left = floor[row][column - 1];
  if (column + 1 <= floor[0].length - 1) right = floor[row][column + 1];

  return center < up && center < down && center < left && center < right;
};

const findLowestPoints = (floor) => {
  const lowestPoints = [];

  for (let row = 0; row < floor.length; row++)
    for (let column = 0; column < floor[0].length; column++)
      if (isLowerThanAdjacent(floor, row, column))
        lowestPoints.push(floor[row][column]);

  return lowestPoints;
};

const mySolution = filePath => {
  const floor = parseInputFile(filePath)
  const lowestPoints = findLowestPoints(floor);
  const riskLevels = lowestPoints.map((lowPoint) => computeRiskLevel(lowPoint));
  const sumRiskLevels = _.sum(riskLevels);
  return sumRiskLevels
}

module.exports = mySolution
