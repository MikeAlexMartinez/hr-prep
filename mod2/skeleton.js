/*
Flesh out the implementation and test it.

Implementation of WHAT, you say? What's the problem statement???

Well, you should be able to tell what this code is intended to do just from reading the starter "skeleton".

Assuming you find the above statement to be true upon reading the outline, well, then that illustrates the power of good outlining. You don't need a bunch of comments explaining the code. The code is effectively SELF-EXPLANATORY, even at this early, not-fully-implemented stage. This is the level of clarity that you should aim for in your own coding too.

===
*Some notes about the skeleton*

When you create such "skeletons" for your own programs, this is a good full-fledged sample to bear in mind.

Note the mixture of real "stub" code and pseudocode.

The stubs are just a few function names and a few key variable names, not whole for-loops and whatnot.

The pseudocode style we want for this purpose is at the level of precise English. It also is not describing for-loops and whatnot. It also is only inside functions. Don't pseudocode functions, just write the functions as empty stubs. That saves you precious time later, with less rewriting.

*/

function findMaxRepeatCountInWord(word) {
  // Break up individual words into individual letters.
  const w = word.toLowerCase().split('');
  // Count the instances of each letter
  const hashTable = {};
  w.forEach(letter => {
    hashTable.hasOwnProperty(letter)
      ? hashTable[letter]++
      : hashTable[letter] = 1;
  });
  // Iterate all the counts and find the highest
  const max = Object.keys(hashTable).reduce((max, key) => {
    return max > hashTable[key] ? max : hashTable[key];
  }, 0);
  // Return this word's max repeat count
  return max;
}

function findFirstWordWithMostRepeatedChars(text) {
  var maxRepeatCountOverall = 0;
  var wordWithMaxRepeatCount = '';

  // remove punctuation and non-alpha characters
  const cleanText = text.replace(/[^a-zA-Z\s]/g,'');
  // Break up input text into words (space-delimited).
  const words = cleanText.split(' ');

  words.forEach(word => {
    // For each word...
    var repeatCountForWord = findMaxRepeatCountInWord(word)
    //  If that max repeat count is higher than the overall max repeat count, then
    if (repeatCountForWord > maxRepeatCountOverall) {
      //    update maxRepeatCountOverall
      maxRepeatCountOverall = repeatCountForWord;
      //    update wordWithMaxRepeatCount
      wordWithMaxRepeatCount = word;
    }
  });
      
  return wordWithMaxRepeatCount;
}

/** 
 * Assumptions:
 * should return first word with highest repeat count of letters
 * return empty string if empty string provided.
 * remove punctuation and digits
 * ignore case
 */

const testOne = `Hello there, I'm Michael`; // Hello
const testTwo = `This is totally banAnas`; // bananas
const testThree = `erm... hows my grammar?`; // grammar  
const testFour = 'tree fiddy!? how about 1000?'; // tree ignore numbers 
const testFive = '';

assertEquals(findFirstWordWithMostRepeatedChars(testOne),'Hello','should return first word encountered with highest repeat count of letters');
assertEquals(findFirstWordWithMostRepeatedChars(testTwo),'banAnas','should ignore case');
assertEquals(findFirstWordWithMostRepeatedChars(testThree),'grammar','should ignore punctuation');
assertEquals(findFirstWordWithMostRepeatedChars(testFour),'tree','should ignore numbers');
assertEquals(findFirstWordWithMostRepeatedChars(testFive),'','should return an empty string when no words provided');

/**
 * Assertions and logging
 */
function logger({type, testName, message}) {
  console.log(`${type} [${testName}]${message ? ' ' + message : ''}`);
}
function assertEquals(actual, expected, testName) {
  actual === expected
    ? logger({type: 'passed', testName})
    : logger({type: 'FAIL', testName, message: `Expected ${expected}, but got ${actual}`});
}