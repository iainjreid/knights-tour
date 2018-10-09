'use strict';

const boardSize = 8;
const boardPositions = {};

class Knight {
  constructor(position = new Position()) {
    this.history = [];
    this.moveTo(position);
  }

  moveTo(position) {
    this.history.push(position.getIdentifier());
    this.position = position;
  }
}

class Position {
  constructor(horizontal = 1, vertical = 1) {
    this.horizontal = horizontal;
    this.vertical = vertical;
  }

  getIdentifier() {
    return Position.parseCoordinates(this.horizontal, this.vertical);
  }

  getMoves() {
    const positions = [];
    const directions = [
      { horizontal: -2, vertical: 1 }, { horizontal: -2, vertical: -1 },
      { horizontal: -1, vertical: 2 }, { horizontal: -1, vertical: -2 },
      { horizontal: 1, vertical: 2 }, { horizontal: 1, vertical: -2 },
      { horizontal: 2, vertical: 1 }, { horizontal: 2, vertical: -1 }
    ];

    for (let { horizontal, vertical } of directions) {
      if (Position.isValid(horizontal + this.horizontal, vertical + this.vertical)) {
        positions.push(boardPositions[Position.parseCoordinates(horizontal + this.horizontal, vertical + this.vertical)]);
      }
    }

    return positions;
  }

  static isValid(horizontal, vertical) {
    return Math.min(horizontal, vertical) > 0 && Math.max(horizontal, vertical) <= boardSize;
  }

  static parseCoordinates(horizontal, vertical) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][horizontal - 1] + vertical;
  }
}

for (let i = 1; i <= boardSize; i++) {
  for (let j = 1; j <= boardSize; j++) {
    let position = new Position(i, j);
    boardPositions[position.getIdentifier()] = position;
  }
}

(function bruteForce() {
  const knight = new Knight();

  while (knight.history.length < boardSize * boardSize) {
    const moves = knight.position.getMoves().filter(move => !knight.history.includes(move.getIdentifier()));

    if (!moves.length) {
      break;
    }

    // Get least valueable move
    let move = moves.reduce((currMove, nxtMove) => {
      const currMoveFutures = currMove.getMoves();
      const nxtMoveFutures = nxtMove.getMoves();

      if (currMoveFutures.length === nxtMoveFutures.length) {
        return [currMove, nxtMove][Math.random() * 2 >> 0]
      }

      return currMoveFutures.length > nxtMoveFutures.length ? nxtMove : currMove;
    }, moves[0]);

    knight.moveTo(move);
  }

  for (let identifier in boardPositions) {
    if (!knight.history.includes(identifier)) {
      return setTimeout(bruteForce);
    }
  }

  return console.log(knight.history);
})();
