const fs = require("fs");

const parseInputFile = (filePath) => {
  const matrixOctopuses = fs.readFileSync(filePath)
    .toString()
    .split("\n")
    .map(lineString => lineString.split('').map(char => new Octopus(parseInt(char))));

  return matrixOctopuses;
};

class Octopus {
  constructor(initialEnergyLevel) {
    this.energyLevel = initialEnergyLevel;
    this.flashedThisStep = false;
  }

  incrementEnergyLevel() {
    this.energyLevel++
  }

  shouldFlash() {
    return this.energyLevel > 9 && !this.flashedThisStep
  }

  flash() {
    this.flashedThisStep = true
  }

  getFlashedThisStep() {
    return this.flashedThisStep
  }

  reset() {
    this.energyLevel = 0
    this.flashedThisStep = false
  }
}

class Cavern {
  constructor(matrixOctopuses) {
    this.matrixOctopuses = matrixOctopuses;
    this.numberFlashes = 0
  }

  getNumberFlashes() {
    return this.numberFlashes
  }

  getNextFlashPosition() {
    for (let row = 0; row < 10; row++)
      for (let column = 0; column < 10; column++)
        if (this.matrixOctopuses[row][column].shouldFlash())
          return { row, column }

    return undefined
  }

  flash(position) {
    this.matrixOctopuses[position.row][position.column].flash()
    this.numberFlashes++

    const topLeftNeighborPosition = position.row - 1 >= 0 && position.column - 1 >= 0 ? { row: position.row - 1, column: position.column - 1 } : undefined
    const topMiddleNeighborPosition = position.row - 1 >= 0 ? { row: position.row - 1, column: position.column } : undefined
    const topRightNeighborPosition = position.row - 1 >= 0 && position.column + 1 <= 9 ? { row: position.row - 1, column: position.column + 1 } : undefined
    const leftMiddleNeighborPosition = position.column - 1 >= 0 ? { row: position.row, column: position.column - 1 } : undefined
    const rightMiddleNeighborPosition = position.column + 1 <= 9 ? { row: position.row, column: position.column + 1 } : undefined
    const bottomLeftNeighborPosition = position.row + 1 <= 9 && position.column - 1 >= 0 ? { row: position.row + 1, column: position.column - 1 } : undefined
    const bottomMiddleNeighborPosition = position.row + 1 <= 9 ? { row: position.row + 1, column: position.column } : undefined
    const bottomRightNeighborPosition = position.row + 1 <= 9 && position.column + 1 <= 9 ? { row: position.row + 1, column: position.column + 1 } : undefined

    const validNeighborPositions = [
      topLeftNeighborPosition,
      topMiddleNeighborPosition,
      topRightNeighborPosition,
      leftMiddleNeighborPosition,
      rightMiddleNeighborPosition,
      bottomLeftNeighborPosition,
      bottomMiddleNeighborPosition,
      bottomRightNeighborPosition,
    ].filter(possibleNeighborPosition => possibleNeighborPosition !== undefined)

    for (const position of validNeighborPositions)
      this.matrixOctopuses[position.row][position.column].incrementEnergyLevel()
  }

  nextStep() {
    for (const lineOctopuses of this.matrixOctopuses) {
      for (const octopus of lineOctopuses) {
        octopus.incrementEnergyLevel()
      }
    }

    let nextFlashPosition = this.getNextFlashPosition()
    while (nextFlashPosition) {
      this.flash(nextFlashPosition)
      nextFlashPosition = this.getNextFlashPosition()
    }

    for (const lineOctopuses of this.matrixOctopuses)
      for (const octopus of lineOctopuses)
        if (octopus.getFlashedThisStep())
          octopus.reset()
  }
}

const mySolution = filePath => {
  const matrixOctopuses = parseInputFile(filePath);
  const cavern = new Cavern(matrixOctopuses);
  for (let i = 1; i <= 100; i++)
    cavern.nextStep()
  const numberFlashes = cavern.getNumberFlashes()
  return numberFlashes
}

module.exports = mySolution