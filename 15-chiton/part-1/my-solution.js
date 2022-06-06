const fs = require("fs");
const Graph = require('node-dijkstra')

const mySolution = filePath => {

  const matrix = fs.readFileSync(filePath).toString().split("\n").map(line => line.split("").map(char => parseInt(char)))
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