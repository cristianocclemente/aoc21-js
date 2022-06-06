const fs = require("fs");
const Graph = require('node-dijkstra')

const printAsMatrix = bidimensionalArray => {
  let string = ""
  bidimensionalArray.forEach(line => string += (line.join("") + '\n'))
  console.log(string)
}

const nextValue = value => value === 9
  ? 1
  : value + 1

const nextTile = tile => {
  const rows = tile.length
  const columns = tile[0].length

  const nextTile = JSON.parse(JSON.stringify(tile))

  for (let row = 0; row < rows; row++)
    for (let column = 0; column < columns; column++)
      nextTile[row][column] = nextValue(nextTile[row][column])

  return nextTile
}

const concatenateRight = (originalTile, newTile) => {
  let resultingTile = JSON.parse(JSON.stringify(originalTile))
  const rows = resultingTile.length
  for (let row = 0; row < rows; row++)
    resultingTile[row] = [...originalTile[row], ...newTile[row]]

  return resultingTile
}

const concatenateDown = (originalTile, newTile) => {
  let resultingTile = JSON.parse(JSON.stringify(originalTile))
  resultingTile = [...resultingTile, ...newTile]

  return resultingTile
}

const getBigMatrix = smallMatrix => {
  let bigMatrix = JSON.parse(JSON.stringify(smallMatrix))
  let tile = smallMatrix

  for (let i = 1; i <= 4; i++) {
    tile = nextTile(tile)
    bigMatrix = concatenateRight(bigMatrix, tile)
  }

  tile = bigMatrix
  for (let i = 1; i <= 4; i++) {
    tile = nextTile(tile)
    bigMatrix = concatenateDown(bigMatrix, tile)
  }

  return bigMatrix
}

const mySolution = filePath => {
  const smallMatrix = fs.readFileSync(filePath).toString().split("\n").map(line => line.split("").map(char => parseInt(char)))

  const matrix = getBigMatrix(smallMatrix)

  const rows = matrix.length
  const columns = matrix[0].length

  const graph = new Graph()
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const neighbors = {}
      if (row - 1 >= 0) neighbors[`${row - 1},${column}`] = matrix[row - 1][column]
      if (column + 1 < columns) neighbors[`${row},${column + 1}`] = matrix[row][column + 1]
      if (row + 1 < rows) neighbors[`${row + 1},${column}`] = matrix[row + 1][column]
      if (column - 1 >= 0) neighbors[`${row},${column - 1}`] = matrix[row][column - 1]

      graph.addNode(`${row},${column}`, neighbors)
    }
  }

  const shortestPath = graph.path("0,0", `${rows - 1},${columns - 1}`, { cost: true })
  return shortestPath.cost
}

module.exports = mySolution