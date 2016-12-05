'use strict';

// Dependencies
const assert = require('assert');

// Load the code
const knightsTour = require('.');

// Ensure that the required classes are correctly defined
assertType(knightsTour.DirectionalValue, 'function'); 
assertType(knightsTour.HorizontalValue, 'function');
assertType(knightsTour.VerticalValue, 'function');
assertType(knightsTour.KnightPosition, 'function');

/**
 * @description This method will ensure that the referenced value is of the correct type (i.e. the type supplied in the
 *              second argument.
 *
 * @param {any}    reference A reference to the value to verfify
 * @param {string} type      The expected data type
 */
function assertType(reference, type) {
  assert.equal(typeof reference, type);
}

for (let method in assert) console.log(method)
