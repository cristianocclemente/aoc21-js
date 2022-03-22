const fs = require("fs");

const parseInput = (filename) => {
  const arrayOfFish = fs
    .readFileSync(filename)
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

const filename = process.argv.slice(2)[0];
const initialArrayOfFish = parseInput(filename);
const adultTime = 7;
const babyTime = adultTime + 2;

const finalArrayOfFish = simulateFish(
  initialArrayOfFish,
  babyTime,
  adultTime,
  80
);

const finalNumberFish = finalArrayOfFish.length;
console.log(finalNumberFish);
