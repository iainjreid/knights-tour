'use strict';

const Knight = require('../../main/lib/knight');

describe('Knight tests', () => {
  test('ensure correct classname', () => {
    expect(Knight.name).toEqual('Knight');
  });
});
