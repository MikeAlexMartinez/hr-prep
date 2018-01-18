/*
Find the longest single-word palindrome within a phrase.
The phrase will only contain letters (no symbols, punctuation, or numbers).
Your palindrome detection should be case-insensitive.
If there are multiple longest palindromes of equal length, return the last one.
*/ 
function findLongestPalindrome(sentence) {
  // split sentence into words
  const wordArray = sentence.split(' ');
  // iterate words and collect the palindromes
  console.log(wordArray);
  const palindromes = wordArray.filter(word => {
    return isPalindrome(word);
  });
  console.log(palindromes);

  // sort the list of palindromes by word length
  const sortedPalindromes = palindromes.sort((a, b) => sortAscendingByLength(a,b));
  // return the length of largest palindrome in the sorted list
  const maxLength = sortedPalindromes[0].length;
  // filter based on length
  const filteredPalindromes = sortedPalindromes.filter(a => a.length === maxLength);
  // return word at end of array, as this will be the last longest palindrome encountered
  return filteredPalindromes[filteredPalindromes.length - 1];
}


function reverseString(string) {
  return string.split('').reverse().join('');
}

function isPalindrome(word) {
  // hint: you can detect palindromes by comparing a string to its reverse
  const cleanWord = word.toLowerCase();
  return cleanWord === reverseString(cleanWord);
}

function sortAscendingByLength(a, b) {
  return b.length - a.length;
}


function assertEquals(actual, expected, testName) {
  return actual === expected
    ? console.log(`passed [${testName}]`)
    : console.log(`FAILED [${testName}] Expected ${expected}, but got ${actual}`);
}

// reverseString
assertEquals(reverseString('barry'),'yrrab','should reverse a string');

// isPalindrome
assertEquals(isPalindrome('ana'),true,'should identify a palindrome');
assertEquals(isPalindrome('barry'),false, 'should identify when a word isn\'t a palindrome');

// Main Tests
const testOne = 'anna went swimming';
const testTwo = 'anna enjoyed watching the cbbc';
const testThree = 'Anna went swimming';
const testFour = 'Anna went swimming with Hannah';

assertEquals(findLongestPalindrome(testOne),'anna', 'should return the palindrome');
assertEquals(findLongestPalindrome(testTwo),'cbbc', 'should return the last palindrome found');
assertEquals(findLongestPalindrome(testThree),'Anna', 'should ignore case');
assertEquals(findLongestPalindrome(testFour),'Hannah', 'should return the longest palindrome');