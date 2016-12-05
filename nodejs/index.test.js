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
 * These tests cover the "DirectionalValue" class along with the "HorizontalValue" and "VerticalValue" classes (this is
 * because these classes both extend the former class).
 */
const range = [1, 2, 3, 4, 5];
const value = new knightsTour.DirectionalValue(1, range);

// Ensure that the value is correctly returned by the getter
assert.strictEqual(value.value, 1);

// Ensure that the class will fail to instantiate when given invalid values
assert.throws(() => new knightsTour.DirectionalValue(0, range));

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
