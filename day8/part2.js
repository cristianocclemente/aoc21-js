const fs = require("fs");
const _ = require("lodash");

const parseInput = (filename) => {
  const entries = fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((line) => line.split("|").map((side) => side.trim().split(" ")));

  return entries;
};

const digitStringToDigit = (digitString) => {
  const sortedDigitString = [...digitString].sort().join("");

  const sortedDigitStringToDigit = {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
    abcdfg: 9,
  };

  return sortedDigitStringToDigit[sortedDigitString];
};

const getPermutations = (array) => {
  const permutations = [];

  if (array.length === 0) return [];

  if (array.length === 1) return [array];

  for (let i = 0; i < array.length; i++) {
    const currentElement = array[i];
    const remainingElements = array.slice(0, i).concat(array.slice(i + 1));
    const remainingElementsPermuted = getPermutations(remainingElements);
    for (let j = 0; j < remainingElementsPermuted.length; j++) {
      const permutedArray = [currentElement].concat(
        remainingElementsPermuted[j]
      );
      permutations.push(permutedArray);
    }
  }
  return permutations;
};

const getWrongSegmentStringToRightSegmentString = (wrongDigitsString) => {
  // generate all possible translation object permutations
  const segments = ["a", "b", "c", "d", "e", "f", "g"];
  const segmentsPermutations = getPermutations(segments);

  const translationObjects = segmentsPermutations.map(
    (segmentsPermutation) => ({
      a: segmentsPermutation[0],
      b: segmentsPermutation[1],
      c: segmentsPermutation[2],
      d: segmentsPermutation[3],
      e: segmentsPermutation[4],
      f: segmentsPermutation[5],
      g: segmentsPermutation[6],
    })
  );

  // try translation object until the right one is found
  const originalDigitStrings = [
    "abcefg",
    "cf",
    "acdeg",
    "acdfg",
    "bcdf",
    "abdfg",
    "abdefg",
    "acf",
    "abcdefg",
    "abcdfg",
  ];

  for (const translationObject of translationObjects) {
    const translatedOriginalDigitsString = originalDigitStrings.map(
      (originalDigitString) =>
        [...originalDigitString].map((char) => translationObject[char])
    );

    const sortedTranslatedOriginalDigitsString =
      translatedOriginalDigitsString.map((translatedOriginalDigitString) =>
        [...translatedOriginalDigitString].sort().join("")
      );

    const sortedWrongDigitsString = wrongDigitsString.map((wrongDigitString) =>
      [...wrongDigitString].sort().join("")
    );

    if (
      _.isEqual(
        sortedTranslatedOriginalDigitsString.sort(),
        sortedWrongDigitsString.sort()
      )
    ) {
      const invertedTranslationObject = _.invert(translationObject);
      return invertedTranslationObject;
    }
  }
};

const getRightDisplay = (line) => {
  const [wrongDigitsString, wrongDisplayString] = line;

  const wrongSegmentStringToRightSegmentString =
    getWrongSegmentStringToRightSegmentString(wrongDigitsString);

  const rightDisplayString = wrongDisplayString.map((wrongDisplayDigitString) =>
    [...wrongDisplayDigitString]
      .map(
        (wrongDisplaySegmentString) =>
          wrongSegmentStringToRightSegmentString[wrongDisplaySegmentString]
      )
      .join("")
  );

  const rightDisplay = parseInt(
    rightDisplayString
      .map((rightDigitString) =>
        digitStringToDigit(rightDigitString).toString()
      )
      .join("")
  );
  return rightDisplay;
};

const filename = process.argv.slice(2)[0];
const lines = parseInput(filename);
const rightDisplays = lines.map((line) => getRightDisplay(line));
const sumRightDisplays = _.sum(rightDisplays);
console.log(sumRightDisplays);
