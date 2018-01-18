/*

An isogram is a word that has no repeating letters, consecutive or non-consecutive. 

Write and test a function that determines whether a string is an isogram. 

Notes:
* Assume your input is only letters.
* Assume the empty string is an isogram. 
* Ignore case.
* Follow the pseudocode exactly!

*/

function isIsogram(text) {
  // add each char to a set
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  // note: a set drops dup values
  // thus, to see if all the chars were unique,
  const textArray = text.toLowerCase().split('');
  
  // check length of text and the size of the set
  const set = new Set(textArray);

  return textArray.length === set.size;
}

// returns true for empty string
assertEquals(isIsogram(''),true,'should return true when passed an empty string');
// correctly identifies isogram
assertEquals(isIsogram('abcde'),true,'should correctly identify an isogram');
assertEquals(isIsogram('abcda'),false,'should correctly identify when something isn\'t an isogram');
// ignores case
assertEquals(isIsogram('abcBA'),false,'should ignore case');

function assertEquals(actual, expected, testName) {
  return actual === expected
    ? console.log(`passed [${testName}]`)
    : console.log(`FAIL [${testName}] Expected ${expected} but received ${actual}`);
} 