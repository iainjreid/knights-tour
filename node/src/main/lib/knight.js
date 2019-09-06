'use strict';

module.exports = class Knight {
  constructor(position) {
    this.history = [];
    this.moveTo(position);
  }

  moveTo(position) {
    this.history.push(position.getIdentifier());
    this.position = position;
  }
}
