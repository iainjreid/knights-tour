'use strict';

class Knight {
  constructor(position = new Position(), board = new Board()) {
    this.position = position;
    this.board = board;
    this.history = [];
  }

  moveTo(position) {
    this.board.markPosition(this.history[this.history.length - 1]);
    this.history.push(this.position);
    this.position = position;
  }

  reverseMove() {
    this.position = this.history.pop();
    this.board.unmarkPosition(this.position);
  }
}

class Board {
  constructor(size = 8) {
    this.size = size;
    this.touched = {};
  }

  markPosition(position) {
    this.touched[position.toString()] = true;
  }

  unmarkPosition(position) {
    this.touched[position.toString()] = false;
  }
}

class Position {
  constructor(horizontal = 1, vertical = 1) {
    this.horizontal = horizontal;
    this.vertical = vertical;
  }

  toString() {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][this.horizontal] + this.vertical;
  }

  getMoves() {
    const positions = [];
    const directions = [
      { horizontal: -2, vertical: 1 }, { horizontal: -2, vertical: -1 }, { horizontal: -1, vertical: 2 }, { horizontal: -1, vertical: -2 },
      { horizontal: 1, vertical: 2 }, { horizontal: 1, vertical: -2 }, { horizontal: 2, vertical: 1 }, { horizontal: 2, vertical: -1 }
    ];

    for (let { horizontal, vertical } of directions) {
      if (Position.isValid(horizontal + this.horizontal, vertical + this.vertical)) {
        positions.push(new Position(horizontal + this.horizontal, vertical + this.vertical));
      }
    }

    return positions;
  }

  static isValid(horizontal, vertical) {
    return Math.min(horizontal, vertical) > 0 && Math.max(horizontal, vertical) <= 8;
  }
}

const knight = new Knight();
const board = new Board();


let touched = [];
let history = [];

(function bruteForce() {
  board = [];
  touched = [];
  history = [];

  for (let horizontal of exports.HorizontalValue.range) {
    for (let vertical of exports.VerticalValue.range) {
      board.push(horizontal + vertical);
      touched.push(false);
    }
  }

  let knight = exports.createKnightPosition('A', 1);
  touched[board.indexOf('A1')] = true

  while (touched.some(x => !x)) {
    const moves = knight.getAvailableMoves().filter(move => {
      return !touched[board.indexOf(move.horizontal.value + move.vertical.value)];
    });

    if (!moves.length) {
      break;
    }

    // Get least valueable move
    let move = moves.reduce((recommendedMove, currentMove) => {
      const recommendedMoveFutures = recommendedMove.getAvailableMoves();
      const currentMoveFutures = currentMove.getAvailableMoves();

      if (recommendedMoveFutures.length === currentMoveFutures.length) {
        return [recommendedMove, currentMove][Math.random() * 2 >> 0]
      }

      return recommendedMoveFutures.length > currentMoveFutures.length ? currentMove : recommendedMove;
    }, moves[0]);

    knight = move;
    history.push(move.horizontal.value + move.vertical.value)
    touched[board.indexOf(move.horizontal.value + move.vertical.value)] = true;
  }

  let i = 0;
  for (let value of touched) {
    if (value) {
      i++
    }
  }

  if (i !== board.length) {
    bruteForce();
  } else {
    console.log(history)
  }
})()

