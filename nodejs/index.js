'use strict';

exports.DirectionalValue = class {
  constructor(value, range) {
    // Ensure that the value is present in the range
    if (!range.includes(value)) {
      throw new Error('Value not found in range');
    }

    this._index = range.indexOf(value);
    this._range = range;
  }

  get value() {
    return this._range[this._index];
  }

  /**
   * @description This method will check to see whether or not the supplied distance would lead to a valid point on the
   *              board.
   *
   * @param {number} distance The distance to check if it is possible on the current range
   *
   * @returns {boolean} Whether or not the distance is possible on the current range
   */
  canMoveBy(distance) {
    return this._range[this._index + distance] !== undefined;
  }

  /**
   * @description This method will return the future value of a supplied distance.
   *
   * @param {number} distance The distance to add to the current index
   *
   * @returns {any} The future value of the supplied distance
   */
  getMoveBy(distance) {
    // Ensure that the distance is achievable
    if (!this.canMoveBy(distance)) {
      throw new Error('Distance not reachable');
    }

    return this._range[this._index + distance];
  }

  /**
   * @description This method will modify the current index according to the distance provided.
   *
   * @param {number} distance The distance to modify the current index by
   */
  moveBy(distance) {
    // Ensure that the distance is achievable
    if (!this.canMoveBy(distance)) {
      throw new Error('Distance not reachable');
    }

    this._index += distance;
  }
}

exports.HorizontalValue = class extends exports.DirectionalValue {
  constructor(value) {
    super(value, exports.HorizontalValue.range);
  }

  static get range() {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  }
}

exports.VerticalValue = class extends exports.DirectionalValue {
  constructor(value) {
    super(value, exports.VerticalValue.range);
  }

  static get range() {
    return [1, 2, 3, 4, 5, 6, 7, 8];
  }
}

exports.KnightPosition = class {
  constructor(horizontal, vertical) {
    // Ensure that the horizontal and vertical values are valid
    if (!(horizontal instanceof exports.HorizontalValue) || !(vertical instanceof exports.VerticalValue)) {
      throw new Error('Value must be of the expected classes');
    }

    this.horizontal = horizontal;
    this.vertical = vertical;
  }

  /**
   * @description This method will return the available new positions from the current position.
   *
   * @returns {Array} An array of the available new positions from the current position
   */
  getAvailableMoves() {
    const positions = [];
    const points = [
      { horizontal: -2, vertical: 1 },
      { horizontal: -2, vertical: -1 },
      { horizontal: -1, vertical: 2 },
      { horizontal: -1, vertical: -2 },
      { horizontal: 1, vertical: 2 },
      { horizontal: 1, vertical: -2 },
      { horizontal: 2, vertical: 1 },
      { horizontal: 2, vertical: -1 }
    ];

    for (let { horizontal, vertical } of points) {
      if (this.horizontal.canMoveBy(horizontal) && this.vertical.canMoveBy(vertical)) {
        horizontal = this.horizontal.getMoveBy(horizontal);
        vertical = this.vertical.getMoveBy(vertical);

        positions.push(exports.createKnightPosition(horizontal, vertical));
      }
    }

    return positions;
  }
}

exports.createKnightPosition = (horizontal, vertical) => {
  return new exports.KnightPosition(new exports.HorizontalValue(horizontal), new exports.VerticalValue(vertical));
}

let board = [];
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

