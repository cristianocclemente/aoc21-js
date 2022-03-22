const fs = require("fs");

class Cell {
  constructor(height) {
    this.height = height;
    this.isInBasin = false;
  }
}

const parseInput = (filename) => {
  const floor = fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((line) => [...line].map((char) => new Cell(parseInt(char))));
  return floor;
};

const isLowerThanAdjacent = (floor, row, column) => {
  const center = floor[row][column].height;
  let up = 10;
  let down = 10;
  let left = 10;
  let right = 10;

  if (row - 1 >= 0) up = floor[row - 1][column].height;
  if (row + 1 <= floor.length - 1) down = floor[row + 1][column].height;
  if (column - 1 >= 0) left = floor[row][column - 1].height;
  if (column + 1 <= floor[0].length - 1) right = floor[row][column + 1].height;

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

const getBasinSize = (floor, row, column) => {
  const center = floor[row][column];
  center.isInBasin = true;
  if (center.height === 9) return 0;

  let basinSize = 1;

  let up = undefined;
  let down = undefined;
  let left = undefined;
  let right = undefined;

  if (row - 1 >= 0) up = floor[row - 1][column];
  if (row + 1 <= floor.length - 1) down = floor[row + 1][column];
  if (column - 1 >= 0) left = floor[row][column - 1];
  if (column + 1 <= floor[0].length - 1) right = floor[row][column + 1];

  if (up && !up.isInBasin) basinSize += getBasinSize(floor, row - 1, column);
  if (down && !down.isInBasin)
    basinSize += getBasinSize(floor, row + 1, column);
  if (left && !left.isInBasin)
    basinSize += getBasinSize(floor, row, column - 1);
  if (right && !right.isInBasin)
    basinSize += getBasinSize(floor, row, column + 1);

  return basinSize;
};

const getBasinsSize = (floor) => {
  const lowestPoints = findLowestPoints(floor);

  const basins = [];

  for (let row = 0; row < floor.length; row++)
    for (let column = 0; column < floor[0].length; column++)
      if (lowestPoints.includes(floor[row][column]))
        basins.push(getBasinSize(floor, row, column));

  return basins;
};

const filename = process.argv.slice(2)[0];
const floor = parseInput(filename);
const productThreeLargestBasins = getBasinsSize(floor)
  .sort((a, b) => (a < b ? 1 : a > b ? -1 : 0))
  .slice(0, 3)
  .reduce((prevProduct, value) => prevProduct * value, 1);
console.log(productThreeLargestBasins);
