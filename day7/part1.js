const fs = require("fs");

const filename = process.argv.slice(2)[0];
const crabsX = fs
  .readFileSync(filename)
  .toString()
  .split(",")
  .map((string) => parseInt(string));

const maxX = Math.max(...crabsX);

let bestX = undefined;
let bestXTotalFuel = undefined;
for (let x = 0; x <= maxX; x++) {
  let totalFuel = 0;
  for (const crabX of crabsX) totalFuel += Math.abs(crabX - x);
  if (x === 0 || totalFuel < bestXTotalFuel) {
    bestX = x;
    bestXTotalFuel = totalFuel;
  }
}
console.log(bestXTotalFuel);