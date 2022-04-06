const fs = require("fs");

const parseInputFile = (filePath) => {
  const crabsX = fs
    .readFileSync(filePath)
    .toString()
    .split(",")
    .map((string) => parseInt(string));

  return crabsX
}

const myAlgorithm = crabsX => {
  const maxX = Math.max(...crabsX);

  let bestX = undefined;
  let bestXTotalFuel = undefined;
  for (let x = 0; x <= maxX; x++) {
    let totalFuel = 0;
    for (const crabX of crabsX) totalFuel += Math.abs(crabX - x);
    if (x === 0 || totalFuel < bestXTotalFuel) {
      bestX = x;
      bestXTotalFuel = totalFuel;
    }
  }

  return bestXTotalFuel
}

const mySolution = filePath => {
  const crabsX = parseInputFile(filePath);
  const amountFuel = myAlgorithm(crabsX)
  return amountFuel
}

module.exports = mySolution
