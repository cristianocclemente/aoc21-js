const fs = require("fs");

const parseInputFile = (filePath) => {
  const bNumbers = fs.readFileSync(filePath).toString().split("\n");
  return bNumbers
}

const myAlgorithm = (bNumbers) => {
  let bGammaRate = "";
  for (let index = 0; index < bNumbers[0].length; index++) {
    let numberOfZeros = 0;
    let numberOfOnes = 0;
    bNumbers.forEach((bNumber) => {
      const value = bNumber[index];
      if (value === "0") numberOfZeros++;
      else if (value === "1") numberOfOnes++;
    });

    if (numberOfZeros > numberOfOnes) bGammaRate += "0";
    else if (numberOfOnes > numberOfZeros) bGammaRate += "1";
  }

  const bEpsilonRate = bGammaRate
    .split("")
    .map((value) => {
      if (value === "0") return "1";
      else if (value === "1") return "0";
    })
    .join("");

  const gammaRate = parseInt(bGammaRate, 2);
  const epsilonRate = parseInt(bEpsilonRate, 2);

  const powerConsumption = gammaRate * epsilonRate;
  return powerConsumption
}

const mySolution = filePath => {
  const bNumbers = parseInputFile(filePath)
  const powerConsumption = myAlgorithm(bNumbers)
  return powerConsumption
}

module.exports = mySolution
