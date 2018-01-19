/*
Assume '#' is like backspace in string. This means that string "a#bc#d" actually is "bd"

"abc#d##c" is "ac"

"abc##d######" is ""

"######" is ""

"" is ""

Your task is to process string with '#' symbols
*/

function assertEquals(actual, expected, testName) {
  actual === expected
    ? console.log(`passed [${testName}]`)
    : console.log(`FAILED [${testName}]\n  Expected:\n    ${expected}\n  Received:\n    ${actual}`);
}

function clean_string(uncleanString) {
  let cleanString = [];

  uncleanString.split('').forEach(char => {
    if (char === '#') {
      cleanString.pop();
    } else {
      cleanString.push(char)
    }
  });

  return cleanString.join('');
}

assertEquals(clean_string('abc#d##c'), "ac", 'should account for backspaces 1');
assertEquals(clean_string('abc####d##c#'), "", 'should account for backspaces 2' );