'use strict';

exports.DirectionalValue = class {
  constructor(value, range) {
    this._index = range.indexOf(value);
    this._range = range;
  }

  get value() {
    return this._range[this._index];
  }

  /**
   * @description This method will check to see whether or not the supplied distance would lead to a valid point on the
   *              board.
   */
  canMoveBy(distance) {
    return this._range[this._index + distance] !== undefined;
  }

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
    if (!~horizontalRange.indexOf(horizontal) || !~verticalRange.indexOf(vertical)) {
      throw new Error('Position not in range');
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

     
  }
}

