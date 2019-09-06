'use strict';

const Knight = require('./lib/knight');
const Position = require('./lib/position');

const boardSize = 8;
const boardPositions = {};

for (let i = 1; i <= boardSize; i++) {
  for (let j = 1; j <= boardSize; j++) {
    let position = new Position(i, j);
    boardPositions[position.getIdentifier()] = position;
  }
}

(function bruteForce() {
  const position = new Position(1, 1);
  const knight = new Knight(position);

  while (knight.history.length < boardSize * boardSize) {
    const moves = knight.position.getMoves(boardPositions).filter(move => !knight.history.includes(move.getIdentifier()));

    if (!moves.length) {
      break;
    }

    // Get least valueable move
    let move = moves.reduce((currMove, nxtMove) => {
      const currMoveFutures = currMove.getMoves(boardPositions);
      const nxtMoveFutures = nxtMove.getMoves(boardPositions);

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
