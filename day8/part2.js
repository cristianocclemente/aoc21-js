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

const getTranslateFunction = (signalPatterns) => {
  const translateFunction = undefined;
  // TODO: implement this function
  return translateFunction;
};

const getOutputValue = (entry) => {
  const [signalPatterns, outputValues] = entry;

  const translateFunction = getTranslateFunction(signalPatterns);
  const translatedOutputValues = translateFunction(outputValues);

  return translatedOutputValues;
};

const filename = process.argv.slice(2)[0];
const entries = parseInput(filename);
const outputValues = entries.map((entry) => getOutputValue(entry));
const sumOutputValues = _.sum(outputValues);
console.log(sumOutputValues);
