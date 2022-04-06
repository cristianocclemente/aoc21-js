const fs = require("fs");

const parseInputFile = (filePath) => {
  const arrayOfFish = fs
    .readFileSync(filePath)
    .toString()
    .split(",")
    .map((string) => parseInt(string));

  return arrayOfFish;
};

const simulateFish = (arrayOfFish, babyTime, adultTime, numberDays) => {
  const simulationArrayOfFish = arrayOfFish;

  for (let day = 0; day < numberDays; day++) {
    let numberOfNewFishToBeAdded = 0;

    for (let i = 0; i < simulationArrayOfFish.length; i++) {
      if (simulationArrayOfFish[i] === 0) {
        numberOfNewFishToBeAdded++;
        simulationArrayOfFish[i] = adultTime - 1;
      } else simulationArrayOfFish[i]--;
    }

    for (let j = 0; j < numberOfNewFishToBeAdded; j++)
      simulationArrayOfFish.push(babyTime - 1);
  }

  return simulationArrayOfFish;
};

const mySolution = filePath => {
  const initialArrayOfFish = parseInputFile(filePath);
  const adultTime = 7;
  const babyTime = adultTime + 2;

  const finalArrayOfFish = simulateFish(
    initialArrayOfFish,
    babyTime,
    adultTime,
    80
  );

  const finalNumberFish = finalArrayOfFish.length;
  return finalNumberFish
}

module.exports = mySolution
