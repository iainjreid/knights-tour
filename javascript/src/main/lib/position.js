'use strict';

module.exports = class Position {
  constructor(horizontal, vertical) {
    this.horizontal = horizontal;
    this.vertical = vertical;
  }

  getIdentifier() {
    return Position.parseCoordinates(this.horizontal, this.vertical);
  }

  getMoves(boardPositions, boardSize) {
    const positions = [];
    const directions = [
      { horizontal: -2, vertical: 1 }, { horizontal: -2, vertical: -1 },
      { horizontal: -1, vertical: 2 }, { horizontal: -1, vertical: -2 },
      { horizontal: 1, vertical: 2 }, { horizontal: 1, vertical: -2 },
      { horizontal: 2, vertical: 1 }, { horizontal: 2, vertical: -1 },
    ];

    for (let { horizontal, vertical } of directions) {
      if (Position.isValid(horizontal + this.horizontal, vertical + this.vertical, boardSize)) {
        positions.push(boardPositions[Position.parseCoordinates(horizontal + this.horizontal, vertical + this.vertical)]);
      }
    }

    return positions;
  }

  static isValid(horizontal, vertical, boardSize) {
    return Math.min(horizontal, vertical) > 0 && Math.max(horizontal, vertical) <= boardSize;
  }

  static parseCoordinates(horizontal, vertical) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][horizontal - 1] + vertical;
  }
}
