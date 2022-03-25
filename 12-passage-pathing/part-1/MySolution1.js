const fs = require("fs");

const parseInput = (filename) => {
  const fileLines = fs.readFileSync(filename).toString().split("\n")
  const adjacencyList = {}
  for (const line of fileLines) {
    const [from, to] = line.split("-")
    if (adjacencyList[from])
      adjacencyList[from] = [...adjacencyList[from], to]
    else
      adjacencyList[from] = [to]
    if (adjacencyList[to])
      adjacencyList[to] = [...adjacencyList[to], from]
    else
      adjacencyList[to] = [from]
  }

  return adjacencyList;
};

const computeAllPaths = (startNode, adjacencyList) => {
  if (startNode === "end")
    return [["end"]]

  if (startNode[0] === startNode[0].toLowerCase()) {
    for (const start in adjacencyList) {
      adjacencyList[start] = adjacencyList[start].filter(end => end !== startNode)
    }
  }

  let allPathsStartingInEnds = []
  for (const end of adjacencyList[startNode]) {
    const adjacencyListDeepCopy = JSON.parse(JSON.stringify(adjacencyList))
    const allPathsStartingInEnd = computeAllPaths(end, adjacencyListDeepCopy)
    allPathsStartingInEnds = [...allPathsStartingInEnds, ...allPathsStartingInEnd]
  }

  const allPaths = allPathsStartingInEnds.map(pathStartingInEnds => [startNode, ...pathStartingInEnds])
  return allPaths
}

const passagePathing1 = (fileName) => {
  const adjacencyList = parseInput(fileName);
  const allPaths = computeAllPaths("start", adjacencyList)
  // console.log(allPaths)
  return allPaths.length
}

module.exports = passagePathing1;