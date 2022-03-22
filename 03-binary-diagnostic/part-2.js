const fs = require("fs");

const bNumbers = fs.readFileSync("input.txt").toString().split("\n");

const lastOneStanding = (bNumbers, criteria) => {
  let bRemainingNumbers = bNumbers;
  for (let index = 0; index < bNumbers[0].length; index++) {
    const bBits = bRemainingNumbers.map((bNumber) => bNumber[index]);
    bRemainingNumbers = bRemainingNumbers.filter(
      (number) => number[index] === selectedValue(bBits, criteria)
    );
    if (bRemainingNumbers.length === 1) return bRemainingNumbers[0];
  }
};

const selectedValue = (bits, criteria) => {
  let numberOfZeros = bits.filter((bit) => bit === "0").length;
  let numberOfOnes = bits.filter((bit) => bit === "1").length;
  return criteria(numberOfZeros, numberOfOnes);
};

const oxygenCriteria = (numberOfZeros, numberOfOnes) =>
  numberOfZeros > numberOfOnes ? "0" : "1";

const co2Criteria = (numberOfZeros, numberOfOnes) =>
  numberOfOnes < numberOfZeros ? "1" : "0";

const bOxygenGeneratorRating = lastOneStanding(bNumbers, oxygenCriteria);
const bCo2ScrubberRating = lastOneStanding(bNumbers, co2Criteria);

const oxygenGeneratorRating = parseInt(bOxygenGeneratorRating, 2);
const co2ScrubberRating = parseInt(bCo2ScrubberRating, 2);

const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;
console.log(lifeSupportRating);
