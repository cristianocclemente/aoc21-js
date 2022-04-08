const fs = require("fs");

const parseInputFile = (filePath) => {
  const fileLines = fs.readFileSync(filePath).toString().split("\n")
  const adjacencyList = {}
  for (const line of fileLines) {
    const [from, to] = line.split("-")
    if (from !== "end" && to !== "start") {
      if (adjacencyList[from])
        adjacencyList[from] = [...adjacencyList[from], to]
      else
        adjacencyList[from] = [to]
    }
    if (from !== "start" && to !== "end") {
      if (adjacencyList[to])
        adjacencyList[to] = [...adjacencyList[to], from]
      else
        adjacencyList[to] = [from]
    }
  }

  return adjacencyList;
};

const computeAllPaths = (visitedNodes, startNode, adjacencyList, hasVisitedSmallCaveTwice) => {
  if (startNode === "end")
    return [["end"]]

  if (startNode[0] === startNode[0].toLowerCase() && visitedNodes.includes(startNode)) {
    hasVisitedSmallCaveTwice = true

    // make small caves already visited not visitable
    const smallCavesAlreadyVisited = visitedNodes.filter(cave => cave[0] === cave[0].toLowerCase())
    for (const key in adjacencyList) {
      adjacencyList[key] = adjacencyList[key].filter(end => !smallCavesAlreadyVisited.includes(end))
    }
  }


  const newVisitedNodes = [...visitedNodes, startNode]

  let allPathsStartingInEnds = []
  for (const end of adjacencyList[startNode]) {
    if (end[0] === end[0].toLowerCase() && visitedNodes.includes(end) && hasVisitedSmallCaveTwice) continue
    const adjacencyListDeepCopy = JSON.parse(JSON.stringify(adjacencyList)) //!!!
    const allPathsStartingInEnd = computeAllPaths(newVisitedNodes, end, adjacencyListDeepCopy, hasVisitedSmallCaveTwice)
    allPathsStartingInEnds = [...allPathsStartingInEnds, ...allPathsStartingInEnd]
  }

  const allPaths = allPathsStartingInEnds.map(pathStartingInEnds => [startNode, ...pathStartingInEnds])
  return allPaths
}

const mySolution = filePath => {
  const adjacencyList = parseInputFile(filePath);
  // console.log(adjacencyList)
  const allPaths = computeAllPaths([], "start", adjacencyList, false)
  // console.log(allPaths)
  return allPaths.length
}

module.exports = mySolution