/*
Problem statement

Accept an array of numbers that represent a phone number.
E.g., [6, 5, 0, 8, 3, 5, 9, 1, 7, 2]
Return as a string in this format: '(650) 835-9172'.

A poor implementation

function renderPhoneNumber(numbers){
  return '(' + numbers[0] + numbers[1] + numbers[2] + ') '
    + numbers[3] + numbers[4] + numbers[5] + '-' 
    + numbers[6] + numbers[7] + numbers[8] + numbers[9];
}

What you should do instead

Read the object-oriented skeleton. 

After you understand the flow of processing that it sketches out, fill in the implementation.

Notes:
* Do not leave any methods unused.

*/

function PhoneNumberFormatter(numbers) {
  this.numbers = numbers;
}

PhoneNumberFormatter.prototype.render = function() {  
  let string = '';
  string += this.getAreaCode() + ' ';
  string += this.getExchangeCode() + '-';
  string += this.getLineNumber();
  return string;
};

PhoneNumberFormatter.prototype.getAreaCode = function() {
  // your code here
  return this.parenthesize(this.slice(0,3));
};

PhoneNumberFormatter.prototype.getExchangeCode = function() {
  // your code here
  return this.slice(3,6);
};

PhoneNumberFormatter.prototype.getLineNumber = function() {
  // your code here
  return this.slice(6);
};

PhoneNumberFormatter.prototype.parenthesize = function(string) {
  return '(' + string + ')';
};

PhoneNumberFormatter.prototype.slice = function(start, end) {
  return this.numbers.slice(start, end).join('');
};

// test One

const numbers = [0,1,2,3,4,5,6,7,8,9];
const phoneNumber = new PhoneNumberFormatter(numbers);
assertEquals(phoneNumber.render(),'(012) 345-6789', 'should render phone number correctly');


function assertEquals(actual, expected, testName) {
  return actual === expected
    ? console.log(`passed [${testName}]`)
    : console.log(`FAILED [${testName}] Expected ${expected}, but got ${actual}`);
}