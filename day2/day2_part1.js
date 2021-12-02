const fs = require("fs");

const instructions = fs.readFileSync("input.txt").toString().split("\n");

let horizontalPosition = 0;
let depth = 0;
instructions.forEach((instruction) => {
  const command = instruction.split(" ")[0];
  const value = parseInt(instruction.split(" ")[1]);
  if (command === "forward") horizontalPosition += value;
  else if (command === "down") depth += value;
  else if (command === "up") depth -= value;
});

console.log(horizontalPosition * depth);
