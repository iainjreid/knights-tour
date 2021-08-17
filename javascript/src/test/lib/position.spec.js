'use strict';

const Position = require('../../main/lib/position');

describe('Position tests', () => {
  test('ensure correct classname', () => {
    expect(Position.name).toEqual('Position');
  });
});
