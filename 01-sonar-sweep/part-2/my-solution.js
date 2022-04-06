const fs = require("fs");

const parseInputFile = (filePath) => {
  const seaFloorDepths = fs
    .readFileSync(filePath)
    .toString()
    .split("\n")
    .map((line) => parseInt(line));

  return seaFloorDepths
}

const myAlgorithm = (depths) => {
  let numberTimesSumMeasurementsInSlidingWindowIncreases = 0;
  let index1 = 0;
  let index2 = 1;

  while (index2 + 2 <= depths.length - 1) {
    const firstWindow = depths[index1] + depths[index1 + 1] + depths[index1 + 2];
    const secondWindow = depths[index2] + depths[index2 + 1] + depths[index2 + 2];
    if (secondWindow > firstWindow) numberTimesSumMeasurementsInSlidingWindowIncreases++;
    index1++;
    index2++;
  }

  return numberTimesSumMeasurementsInSlidingWindowIncreases;
}

const mySolution = filePath => {
  const seaFloorDepths = parseInputFile(filePath)
  const numberTimesSumMeasurementsInSlidingWindowIncreases = myAlgorithm(seaFloorDepths)
  return numberTimesSumMeasurementsInSlidingWindowIncreases
}

module.exports = mySolution
