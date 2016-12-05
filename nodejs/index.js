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
  constructor(horizontalValue, verticalValue) {
    // Ensure that the horizontal and vertical values are valid
    if (!(horizontalValue instanceof exports.HorizontalValue) || !(verticalValue instanceof exports.VerticalValue)) {
      throw new Error('Value must be of the expected classes');
    }

    this.horizontalValue = horizontalValue;
    this.verticalValue = verticalValue;
  }

  /**
   * @description This method will return the available new positions from the current position.
   *
   * @returns {Array} An array of the available new positions from the current position
   */
  getAvailableMoves() {
    const positions = [];

    if (this.horizontalValue.canMoveBy(-2)) {
      if (this.verticalValue.canMoveBy(1) {
        positions.push(new exports.KnightPosition())
      }
    }   
  }
}

exports.createKnightPosition = (horizontalValue, verticalValue) => {
  horizontalValue = new exports.HorizontalValue(horizontalValue);
  verticalValue = new exports.VerticalValue(verticalValue);
  
  return new exports.KnightPosition(horizontalValue, verticalValue);
}

