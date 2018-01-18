/*
Use the skeleton provided to write a working implementation.

Notes: 
* Do not leave any functions in the skeleton unused.
* Test that your implementation works.

Specifically -- your code reviewer should be able to just press the [Run] button and see convincing evidence that your code works, because of:
a) the categorical reasoning displayed by your tests
b) the line(s) of output in the console log saying "passed" coming from those tests

*/

// test that array is valid and not empty
function validArray(array) {
  return Array.isArray(array) && array.length > 0;
}

// Skeleton
function average(numbers) {
  // verify input
  if (!validArray(numbers)) return 0;

  // process array of numbers
  return sum(numbers) / numbers.length
}

function sum(numbers) {
  // process array of numbers
  // verify input
  if (!validArray(numbers)) return 0;

  // reduce array of numbers
  return numbers.reduce((total, value) => total + value, 0);
}

// sum assertions
assertEquals(sum([1,2,3]), 6, 'should return sum of all numbers in array');
assertEquals(sum([]), 0, 'should return 0 for empty array');
assertEquals(sum('a'), 0, 'should return 0 for non array object');

// average assertions
assertEquals(average([1,2,3]), 2, 'should return average of all numbers in array');
assertEquals(average([]), 0, 'should return 0 for empty array');
assertEquals(average('a'), 0, 'should return 0 for non array object');

// Basic Assertion statement
function assertEquals(actual, expected, testName) {
  return actual === expected
    ? console.log(`[${testName}] passed`)
    : console.log(`FAIL [${testName}] Expected "${expected}", but received "${actual}"`);
}