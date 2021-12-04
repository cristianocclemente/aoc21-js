const fs = require("fs");

class Cell {
  constructor(value) {
    this.value = value;
    this.drawn = false;
  }

  update(number) {
    if (number === this.value) this.drawn = true;
  }
}

class Board {
  constructor(matrix) {
    this.matrix = matrix;
    this.won = false;
  }

  update(number) {
    for (const line of this.matrix)
      for (const cell of line) cell.update(number);
    if (this.isWinner()) this.won = true;
  }

  isWinner() {
    const hasWinningLine = this.matrix.some((line) =>
      line.every((cell) => cell.drawn)
    );

    let hasWinningColumn = false;
    for (let i = 0; i < this.matrix[0].length; i++) {
      let drawnCells = 0;
      for (let j = 0; j < this.matrix[0].length; j++)
        if (this.matrix[j][i].drawn) drawnCells++;
      if (drawnCells === this.matrix[0].length) hasWinningColumn = true;
    }

    return hasWinningLine || hasWinningColumn;
  }

  getScore(numberJustCalled) {
    let sumUnmarkedNumbers = 0;
    for (let i = 0; i < this.matrix[0].length; i++)
      for (let j = 0; j < this.matrix[0].length; j++) {
        const currentCell = this.matrix[i][j];
        if (!currentCell.drawn) sumUnmarkedNumbers += currentCell.value;
      }

    return sumUnmarkedNumbers * numberJustCalled;
  }
}

const parseInput = (filename) => {
  const input = fs.readFileSync("input.txt").toString().split("\n");

  const numbers = input[0].split(",").map((string) => parseInt(string));

  const boards = [];
  for (let i = 2; i < input.length; i += 6) {
    const matrix = [];
    for (let j = i; j < i + 5; j++) {
      const line = input[j]
        .split(" ")
        .filter((item) => item != "")
        .map((string) => parseInt(string))
        .map((value) => new Cell(value));
      matrix.push(line);
    }
    boards.push(new Board(matrix));
  }

  return { numbers, boards };
};

const getLastWinningBoardScore = (numbers, boards) => {
  for (const number of numbers) {
    const remainingBoards = boards.filter((board) => !board.won);

    remainingBoards.forEach((board) => {
      board.update(number);
    });

    const numberRemainingBoards = remainingBoards.filter(
      (board) => !board.won
    ).length;
    if (numberRemainingBoards === 0) {
      const lastWinningBoard = remainingBoards[0];
      return lastWinningBoard.getScore(number);
    }
  }
};

const { numbers, boards } = parseInput("input.txt");
const lastWinningBoardScore = getLastWinningBoardScore(numbers, boards);
console.log(lastWinningBoardScore);
