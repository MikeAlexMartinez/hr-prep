/*
Convert from a flat class list of names to an object literal decorated with an age for each student.

The ages should be randomly generated for each student, either age 10 or age 11.

Example:
var classList = ["Joe", "Jack", "John", "Fred", "Frank", "Barry", "Larry", "Mary",
"Harry", "Farrell", "Susan", "Monica", "Keira", "Caroline", "Harriet", "Erica",
"Luann", "Cheryl", "Beth", "Rupa", "Linda", "Allison", "Nancy", "Dora"];

var classListWithAges = [{"name":"Joe","age":11},{"name":"Jack","age":10},
{"name":"John","age":11},{"name":"Fred","age":11},{"name":"Frank","age":11},
{"name":"Barry","age":11},{"name":"Larry","age":11},{"name":"Mary","age":11},
{"name":"Harry","age":11},{"name":"Farrell","age":10},{"name":"Susan","age":10},
{"name":"Monica","age":11},{"name":"Keira","age":10},{"name":"Caroline","age":10},
{"name":"Harriet","age":11},{"name":"Erica","age":11},{"name":"Luann","age":10},
{"name":"Cheryl","age":11},{"name":"Beth","age":10},{"name":"Rupa","age":11},
{"name":"Linda","age":10},{"name":"Allison","age":10},{"name":"Nancy","age":10},
{"name":"Dora","age":10}]

Hint: Given that the age for each student is random upon each run, we suggest that your tests check for age values of EITHER 10 or 11.

*/

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function decorateClassListWithAges(classList) {
  // verify input return empty array if invalid
  if ( !Array.isArray(classList) || classList.length === 0) return [];
  
  let updatedClassList = [];

  // your code here
  classList.forEach(v => {
    if (typeof v === 'string' && v.length > 0) {
      updatedClassList.push(
        {
          name: v,
          age: getRandomIntInclusive(10, 11)
        }
      );
    }
  });

  return updatedClassList;
}

// Assertion Tests
function assertionMessage(bool, actual, expected, testName) {
  bool
    ? console.log(`passed [${testName}]`)
    : console.log(`FAILURE [${testName}] Error, Expected "${expected}", but got "${actual}"`);
}
function assertEquals(actual, expected, testName) {
  return assertionMessage(actual === expected, actual, expected, testName);
}
function assertArrayEquals(actual, expected, testName) {
  return assertionMessage(equal(actual, expected), actual, expected, testName);

  // This function can deal with nested arrays that eventually 
  // evaluate to scalar values only.
  function equal(a, b) {
    if ( a === b ) return true;

    const arrA = Array.isArray(a);
    const arrB = Array.isArray(b);
    if ( arrA && arrB ) {
      if (a.length === a.length) return true;
      for (let i = 0; i < a.length; i++) {
        if ( !equal(a[i],b[i]) ) return false;
      }
      return true
    }

    return false;
  }
}

// helpers
function isTenOrEleven(age) {
  return age === 10 || age === 11;
}

// Tests
let classOne = ['sally', 'harry'];
let testOne = decorateClassListWithAges(classOne);

// return length two
assertEquals(testOne.length,2,'should have a length of 2');
// first name is sally
assertEquals(testOne[0].name,'sally','item 0 should have a name of Sally');
// second age is 10 or 11
assertEquals(isTenOrEleven(testOne[0].age) && isTenOrEleven(testOne[1].age), true, 'should have an age of either 10 or 11');

// what happens if array is empty?
assertArrayEquals(decorateClassListWithAges([]),[],'should return empty array when no values provided');
// what happens if array isn't array?
assertArrayEquals(decorateClassListWithAges('a','b'), [], 'should return empty array if non-array provided as input');

// what happens if non-strings are provided in class list?
const testTwo = decorateClassListWithAges([1,2].concat(classOne));
assertEquals(testTwo.length, 2, 'should filter out non string values and return length of 2');
assertEquals(testTwo[0].name, 'sally', 'should filter out non string values and return 0 item with name sally');
