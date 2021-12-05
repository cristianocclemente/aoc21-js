const fs = require("fs");

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor(point1, point2) {
    this.point1 = point1;
    this.point2 = point2;
  }

  getArrayOfPoints() {
    const arrayOfPoints = [];

    if (this.isHorizontal()) {
      const minX = Math.min(this.point1.x, this.point2.x);
      const maxX = Math.max(this.point1.x, this.point2.x);
      const y = this.point1.y;
      for (let x = minX; x <= maxX; x++) {
        const newPoint = new Point(x, y);
        arrayOfPoints.push(newPoint);
      }
    } else if (this.isVertical()) {
      const x = this.point1.x;
      const minY = Math.min(this.point1.y, this.point2.y);
      const maxY = Math.max(this.point1.y, this.point2.y);
      for (let y = minY; y <= maxY; y++) {
        const newPoint = new Point(x, y);
        arrayOfPoints.push(newPoint);
      }
    } else {
      let x = this.point1.x;
      let y = this.point1.y;
      const finalX = this.point2.x;
      const finalY = this.point2.y;
      while (x !== finalX && y !== finalY) {
        const newPoint = new Point(x, y);
        arrayOfPoints.push(newPoint);
        x += x < finalX ? 1 : -1;
        y += y < finalY ? 1 : -1;
      }
      const finalPoint = new Point(finalX, finalY);
      arrayOfPoints.push(finalPoint);
    }

    return arrayOfPoints;
  }

  isHorizontal() {
    return this.point1.y === this.point2.y;
  }

  isVertical() {
    return this.point1.x === this.point2.x;
  }

  isDiagonal() {
    return !this.isHorizontal() && !this.isVertical();
  }
}

class OceanFloor {
  constructor(arrayOfLines) {
    this.arrayOfLines = arrayOfLines;
  }

  toDictionary() {
    const dictionary = {};

    for (const line of arrayOfLines) {
      const arrayOfPoints = line.getArrayOfPoints();
      for (const point of arrayOfPoints) {
        const pointKey = `[${point.x},${point.y}]`;
        if (pointKey in dictionary) dictionary[pointKey]++;
        else dictionary[pointKey] = 1;
      }
    }

    return dictionary;
  }

  numberOverlappingLines() {
    const dictionary = this.toDictionary();

    let numberOverlappingLines = 0;
    for (const value of Object.values(dictionary))
      if (value > 1) numberOverlappingLines++;

    return numberOverlappingLines;
  }
}

const parseInput = (filename) => {
  const fileLines = fs.readFileSync("input.txt").toString().split("\n");

  const arrayOfLines = [];
  for (const fileLine of fileLines) {
    const [x1, y1, x2, y2] = fileLine
      .split(/,|->/)
      .map((string) => parseInt(string));
    const newLine = new Line(new Point(x1, y1), new Point(x2, y2));
    arrayOfLines.push(newLine);
  }

  return arrayOfLines;
};

const arrayOfLines = parseInput("input.txt");
const oceanFloor = new OceanFloor(arrayOfLines);
const numberOverlappingLines = oceanFloor.numberOverlappingLines();
console.log(numberOverlappingLines);
