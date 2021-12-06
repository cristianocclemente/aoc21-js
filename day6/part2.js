const fs = require("fs");

const parseInput = (filename, babyTime) => {
  const arrayOfFish = fs
    .readFileSync(filename)
    .toString()
    .split(",")
    .map((string) => parseInt(string));

  const daysToNumber = Array(babyTime).fill(0);
  for (const fish of arrayOfFish) daysToNumber[fish]++;
  return daysToNumber;
};

const simulateFish = (daysToNumber, babyTime, adultTime, numberDays) => {
  const simulationDaysToNumber = daysToNumber;

  for (let day = 0; day < numberDays; day++) {
    const numberPregnantFish = simulationDaysToNumber[0];
    simulationDaysToNumber[0] = 0;

    // update existing fish other than the pregnant ones
    for (let i = 1; i < babyTime; i++)
      simulationDaysToNumber[i - 1] = simulationDaysToNumber[i];

    // pregnant fish give birth
    simulationDaysToNumber[adultTime - 1] += numberPregnantFish;
    simulationDaysToNumber[babyTime - 1] = numberPregnantFish;
  }

  return simulationDaysToNumber;
};

const adultTime = 7;
const babyTime = adultTime + 2;
const filename = process.argv.slice(2)[0];
const initialDaysToNumber = parseInput(filename, babyTime);

const finalDaysToNumber = simulateFish(
  initialDaysToNumber,
  babyTime,
  adultTime,
  256
);

const finalNumber = finalDaysToNumber.reduce((partialSum, v) => partialSum + v);
console.log(finalNumber);
