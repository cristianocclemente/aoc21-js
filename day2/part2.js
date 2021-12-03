const fs = require("fs");

const instructions = fs.readFileSync("input.txt").toString().split("\n");

let aim = 0;
let horizontalPosition = 0;
let depth = 0;
instructions.forEach((instruction) => {
  const command = instruction.split(" ")[0];
  const value = parseInt(instruction.split(" ")[1]);
  if (command === "down") aim += value;
  else if (command === "up") aim -= value;
  else if (command === "forward") {
    horizontalPosition += value;
    depth += aim * value;
  }
});

console.log(horizontalPosition * depth);
