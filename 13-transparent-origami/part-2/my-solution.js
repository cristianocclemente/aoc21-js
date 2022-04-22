const fs = require("fs");
const _ = require("lodash");

const printAsMatrix = bidimensionalArray => {
  let string = ""
  bidimensionalArray.forEach(line=> string += (line.join(" ") + '\n'))
  console.log(string)
}

const parseInputFile = filePath => {
  const fileLines = fs.readFileSync(filePath).toString().split("\n")

  let points = []
  for (const line of fileLines) {
    if (line === '') break
    const [x, y] = line.split(',')
    points = [...points, { x: parseInt(x), y: parseInt(y) }]
  }

  const numberMatrixColumns = _.max(points.map(point => point.x)) + 1
  const numberMatrixLines = _.max(points.map(point => point.y)) + 1
  
  const paper = Array(numberMatrixLines).fill().map(() => Array(numberMatrixColumns).fill('.'))
  
  for (const point of points) {
    const { x, y } = point
    paper[y][x] = '#'
  }

  let instructions = []
  let foundEmptyLine = false
  for (const line of fileLines) {
    if (line === '') {
      foundEmptyLine = true
      continue
    }
    
    if (foundEmptyLine) {
      const [axis, value] = line.split(' ')[2].split('=')
      instructions = [...instructions, {axis, value:parseInt(value)}]
    }
  }

  return {paper, instructions}
};

const applyInstruction = (paper, instruction) => {
  const {axis, value} = instruction
  return axis === 'x'? foldAlongXAxis(paper, value) : foldAlongYAxis(paper, value)
}

const foldAlongYAxis = (paper, yValue) => {
  let foldedPaper = Array(yValue).fill().map(() => Array(paper[0].length).fill('.'))
  for(let y=0; y<paper.length; y++) {
    for(let x=0; x<paper[0].length; x++) {
      if(paper[y][x] === '#') {
        if(y < yValue)
          foldedPaper[y][x] = '#'
        else
          foldedPaper[yValue - (y-yValue)][x] = '#'
      }
    }
  }

  return foldedPaper
}

const foldAlongXAxis = (paper, xValue) => {
  let foldedPaper = Array(paper.length).fill().map(() => Array(xValue).fill('.'))
  for(let y=0; y<paper.length; y++) {
    for(let x=0; x<paper[0].length; x++) {
      if(paper[y][x] === '#') {
        if(x < xValue)
          foldedPaper[y][x] = '#'
        else
          foldedPaper[y][xValue - (x-xValue)] = '#'
      }
    }
  }

  return foldedPaper
}

const foldAccordingToInstructions = (paper, instructions) => {
  let foldedPaper = paper
  
  for(const instruction of instructions) {
    foldedPaper = applyInstruction(foldedPaper, instruction)
  }

  return foldedPaper
}

const mySolution = filePath => {
  const {paper, instructions} = parseInputFile(filePath)
  const foldedPaper = foldAccordingToInstructions(paper, instructions)
  printAsMatrix(foldedPaper)
}

module.exports = mySolution