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
  let numberMeasurementsLargerThanPreviousMeasurement = 0;
  let index1 = 0;
  let index2 = 1;

  while (index2 <= depths.length - 1) {
    const firstElement = depths[index1];
    const secondElement = depths[index2];
    if (secondElement > firstElement) numberMeasurementsLargerThanPreviousMeasurement++;
    index1++;
    index2++;
  }

  return numberMeasurementsLargerThanPreviousMeasurement
}

const mySolution = filePath => {
  const seaFloorDepths = parseInputFile(filePath)
  const numberMeasurementsLargerThanPreviousMeasurement = myAlgorithm(seaFloorDepths)
  return numberMeasurementsLargerThanPreviousMeasurement
}

module.exports = mySolution
