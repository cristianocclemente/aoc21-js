const fs = require("fs");

const parseInputFile = filePath => {
  const fileLines = fs.readFileSync(filePath).toString().split("\n")

  const template = fileLines[0]
  fileLines.shift()

  fileLines.shift()

  const pairToElement = {}
  for(const line of fileLines) {
    const [pair, element] = line.split(" -> ")
    pairToElement[pair] = element
  }

  return {template, pairToElement}
};

const formulaToListOfPairs = formula => {
  // "ABC" -> ["AB", "BC"]

  let listOfPairs = []

  for(let i = 0; i<formula.length-1; i++)
    listOfPairs = [...listOfPairs, `${formula[i]}${formula[i+1]}`]
  
  return listOfPairs
}

const listOfPairsToFormula = listOfPairs => {
  // ["AB", "BC"] -> "ABC"

  let formula = ""

  for(const pair of listOfPairs)
    formula += pair[0]
  formula += listOfPairs[listOfPairs.length - 1][1]
  
  return formula
}

const pairToElementToPairToPairs = pairToElement => {
  // {"AB": "C"} -> {"AB": ["AC", "CB"]}

  const pairToPairs = {}

  for(const pair in pairToElement) {
    const [first, second] = pair
    pairToPairs[pair] = [`${first}${pairToElement[pair]}`, `${pairToElement[pair]}${second}`]
  }

  return pairToPairs
}

const pairInsertionStep = (currentFormula, pairToElement) => {
  const pairToPairs = pairToElementToPairToPairs(pairToElement)
  const currentPairs = formulaToListOfPairs(currentFormula)
  let futurePairs = []
  
  for(const pair of currentPairs) {
    if(pair in pairToPairs)
      futurePairs = [...futurePairs, ...pairToPairs[pair]]
    else
      futurePairs = [...futurePairs, pair]
  }
    
  return listOfPairsToFormula(futurePairs)
}

const pairInsertionNSteps = (template, pairToElement, steps) => {
  let formula = template
  
  for(let i=1; i <= steps; i++)
    formula = pairInsertionStep(formula, pairToElement)

  return formula
}

const formulaToElementToFrequency = formula => {
  // "ACBAACA" -> {"A": 4, "B": 1, "C": 2}

  const elementToFrequency = {}

  for(const element of formula)
    element in elementToFrequency ? elementToFrequency[element]++ : elementToFrequency[element] = 1
  
  return elementToFrequency
}

const quantityMostCommonElement = formula => {
  const elementToFrequency = formulaToElementToFrequency(formula)
  const quantityMostCommonElement = Object.values(elementToFrequency).sort((a, b) => b - a)[0]
  return quantityMostCommonElement
}

const quantityLeastCommonElement = formula => {
  const elementToFrequency = formulaToElementToFrequency(formula)
  const quantityLeastCommonElement = Object.values(elementToFrequency).sort((a, b) => a - b)[0]
  return quantityLeastCommonElement
}

const mySolution = filePath => {
  const {template, pairToElement} = parseInputFile(filePath)
  const formula = pairInsertionNSteps(template, pairToElement, 10)
  return quantityMostCommonElement(formula) - quantityLeastCommonElement(formula)
}

module.exports = {
  parseInputFile,
  formulaToListOfPairs,
  listOfPairsToFormula,
  pairToElementToPairToPairs,
  pairInsertionStep,
  pairInsertionNSteps,
  formulaToElementToFrequency,
  quantityMostCommonElement,
  quantityLeastCommonElement,
  mySolution
}