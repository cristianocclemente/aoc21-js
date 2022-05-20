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
}

const toPairToFrequency = formula => {
  const pairToFrequency = {}

  for(let i = 0; i<formula.length-1; i++) {
    const pair = `${formula[i]}${formula[i+1]}`
    if(pair in pairToFrequency) pairToFrequency[pair]++
    else pairToFrequency[pair] = 1
  }
  
  return pairToFrequency
}

const toPairToPairs = pairToElement => {
  const pairToPairs = {}

  for(const pair in pairToElement) {
    const [first, second] = pair
    pairToPairs[pair] = [`${first}${pairToElement[pair]}`, `${pairToElement[pair]}${second}`]
  }

  return pairToPairs
}

const pairInsertionStep = (pairToFrequency, pairToPairs) => {
  const futurePairToFrequency = {...pairToFrequency}
  
  for(const pair in pairToFrequency) {
    if(pair in pairToPairs) {

      const pastFrequency = pairToFrequency[pair]
      futurePairToFrequency[pair] -= pastFrequency
      if(futurePairToFrequency[pair] === 0) delete futurePairToFrequency[pair]
      
      for(const newPair of pairToPairs[pair]) {
        if(newPair in futurePairToFrequency) futurePairToFrequency[newPair] += pastFrequency
        else futurePairToFrequency[newPair] = pastFrequency
      }
    }
  }

  return futurePairToFrequency
}

const pairInsertionNSteps = (template, pairToElement, steps) => {
  let pairToFrequency = toPairToFrequency(template)
  const pairToPairs = toPairToPairs(pairToElement)
  
  for(let i=1; i <= steps; i++)
    pairToFrequency = pairInsertionStep(pairToFrequency, pairToPairs)

  return pairToFrequency
}

const toElementToFrequency = (pairToFrequency, template) => {
  const elementToFrequency = {}

  for(const pair in pairToFrequency)
    for(const element of pair) {
      if(element in elementToFrequency) elementToFrequency[element] += pairToFrequency[pair]
      else elementToFrequency[element] = pairToFrequency[pair]
    }
  
  // at this point each element frequency is the double of what it should be expect for the first and last letters of the "current formula"
  // but because of how the formula was derived from the template (by inserting a letter IN THE MIDDLE of the existing pair)
  // then we can be sure that the first and last letters of the "current formula" are the same as the first and last letters of the template

  const firstElementTemplate = template[0]
  const lastElementTemplate = template[template.length - 1]
  elementToFrequency[firstElementTemplate]++
  elementToFrequency[lastElementTemplate]++

  // at this point each element frequency is the double of what it should be

  for(const element in elementToFrequency)
    elementToFrequency[element] /= 2
  
  // only now do we have the actual element to frequency map

  return elementToFrequency
}

const quantityMostCommonElement = (pairToFrequency, template) => {
  const elementToFrequency = toElementToFrequency(pairToFrequency, template)
  const quantityMostCommonElement = Object.values(elementToFrequency).sort((a, b) => b - a)[0]
  return quantityMostCommonElement
}

const quantityLeastCommonElement = (pairToFrequency, template) => {
  const elementToFrequency = toElementToFrequency(pairToFrequency, template)
  const quantityLeastCommonElement = Object.values(elementToFrequency).sort((a, b) => a - b)[0]
  return quantityLeastCommonElement
}

const mySolution = (filePath, steps) => {
  const {template, pairToElement} = parseInputFile(filePath)
  const pairToFrequency = pairInsertionNSteps(template, pairToElement, steps)
  return quantityMostCommonElement(pairToFrequency, template) - quantityLeastCommonElement(pairToFrequency, template)
}

module.exports = {
  parseInputFile,
  toPairToFrequency,
  toPairToPairs,
  pairInsertionStep,
  pairInsertionNSteps,
  toElementToFrequency,
  quantityMostCommonElement,
  quantityLeastCommonElement,
  mySolution
}