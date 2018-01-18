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
  // your code here
  let updatedList = [];
  // Check that classList is Array
  if (Array.isArray(classList)) {
    // Check that classList Array values are strings

    classList.forEach(v => {
      if (typeof v === 'string' && v.split('').length > 0) {
        let newObj = {};
        
        newObj.name = v;
        newObj.age = getRandomIntInclusive(10, 11);
        
        updatedList.push(newObj);
      }
    });
  }
  
  return updatedList;
}

// Test
let indent = 0;
describe('decorateClassListWithAges', () => {
  
  describe('Tests for incorrect input', () => {
    
    it('returns empty array when empty array provided', (str) => {
      return assertDeepEquals(decorateClassListWithAges([]),[],str);
    });
    
    it('returns empty array when non-array provided', (str) => {
      return assertDeepEquals(decorateClassListWithAges('a'),[],str);
    });

    it('returns empty array when array with no strings provided', (str) => {
      return assertDeepEquals(decorateClassListWithAges([1,2,3]),[],str);
    });
    
  });
  
  describe('Deals with good input', () => {
    
    it('returns array with ages added to perfect simple input', (str) => {
      const classList = ['harry','sally','alfie','tim'];
      const classListWithAges = decorateClassListWithAges(classList);
      
      const {status, message} = checkArray(classListWithAges, str);

      return status 
        ? {status, message: `[${str}] passed`}
        : {status, message: `[${str}] FAILED, output doesn't meet required structure - ${message}`};
    });

    it('returns array with ages added to string values given in input, other input is excluded', (str) => {
      const classList = [1,2,'harry','sally'];
      const classListWithAges = decorateClassListWithAges(classList);
      
      const {status, message} = checkArray(classListWithAges, str);

      return status 
        ? {status, message: `[${str}] passed`}
        : {status, message: `[${str}] FAILED, output doesn't meet required structure - ${message}`};
    });

    it('returns array with ages added to string values whose length is greater than 0', (str) => {
      const classList = ['','harry','sally'];
      const classListWithAges = decorateClassListWithAges(classList);
      let s, m;

      if (classListWithAges.length !== 2) {
        s = false;
        m =  `output should have a length of 2`;
      } else {
        let {status, message} = checkArray(classListWithAges, str);
        s = status;
        m = message;
      }

      return s
        ? {status: s, message: `[${str}] passed`}
        : {status: s, message: `[${str}] FAILED, output doesn't meet required structure - ${message}`};
    });
  });
});


/**
 * Assertion Tools
 */
function checkArray(arr, str) {
  let status = true;
  let message = 'passed';
  let err;

  if (Array.isArray(arr) && arr.length > 0) {
    status = arr.every(v => {
      let res = assertNameAndAge(v, str);
  
      if(!res.status) {
        err = res.message;
      }
  
      return res.status;
    });
  } else {
    status = false;
    err = 'Empty array or non-array provided!';
  }

  if(err) message = err;

  return {
    status: status,
    message: message
  };

}

function isTenOrEleven(n) {
  return n === 10 || n === 11;
}

function assertNameAndAge(o, desc) {
  if (!(Object.keys(o).length === 2)) {
    return {
      status: false,
      message: `object has wrong number of keys, testing ${o.toString()}`
    };
  }
  if (!o.name || !(typeof o.name === 'string')) {
    return { 
      status: false,
      message: `expected o.name to be a string, received ${o.name}, testing ${o.toString()}`
    };
  }
  if (!o.age || !isTenOrEleven(o.age)) {
    return { 
      status: false,
      message: `expected o.age to be 10 or 11, received ${o.age}, testing ${o.toString()}`
    }
  };
  
  return {
    status: true,
    message: 'passed'
  };                          
} 

// Assertion Message
function assertionMessage(bool, {a, b}, description) {
  let r = {
    status: bool,
    description: description
  };
  
  bool
    ? r.message = `[${description}] passed`
    : r.message = `[${description}] FAILED - Expected ${b} but received ${a}`;
  
  return r
}

function assertEquals(a, b, description) {
  return assertionMessage( a === b, {a, b}, description);
}

function assertDeepEquals(a, b, description) {
  return assertionMessage( equal(a, b), {a, b}, description);

  function equal(a,b) {
    
    if (a === b) return true;
    
    // Tests for arrays
    const arrA = Array.isArray(a);
    const arrB = Array.isArray(b);
    if (arrA && arrB) {
      if (a.length !== b.length) return false;
      for(let i = 0; i < a.length; i++) {
        if (!equal(a[i], b[i])) return false;
      }
      return true;
    }
    if (arrA !== arrB) return false;
            
    // test for object
    if(a && b && typeof a === 'object' && typeof b === 'object') {
      // keys length
      const keys = Object.keys(a); 
      
      if (keys.length !== Object.keys(b).length) return false;
      
      // test for Dates
      const dateA = a instanceof Date;
      const dateB = b instanceof Date;
      if (dateA && dateB) return a.getTime() === b.getTime();
      if (dateA !== dateB) return false;
      // test for Regexp
      const regA = a instanceof RegExp;
      const regB = b instanceof RegExp;
      if (regA && regB) return a.toString() === b.toString();
      if (regA !== regB) return false;

      // test object keys existence
      for(let i = 0; i < keys.length; i++) {
        if (!b.hasOwnProperty(keys[i])) return false;
      }

      // test object values
      for(let i = 0; i < keys.length; i++) {
        if (!equal(a[keys[i]],b[keys[i]])) return false;
      }
      
      return true;
    }
   
    return false;
  }
}
    
/**
 *  Logging Statements
 */
    
function colorize(type, str) {
  const COLORS = {
    err: 'red',
    ok: 'green'
  };
  
  console.log(`%c${str}`, `color: ${COLORS[type]}`);
}
function status(type) {
  const STATUS = {
    ok: '✓',
    err: '✖'
  };
  return STATUS[type];
}

function start() {
  indent++;
}
function done() {
  indent--;
}
    
function constructPadding(padding) {
  let str = '';
  for(let i = 0; i < padding; i++) {
    str += ' ';
  }
  return str;
}
    
function log(type, str) {
  let padding = constructPadding(indent * 2);
  if (type === 'info') {
    console.log(padding + str);
  } else {
    colorize(type, padding + status(type) + ' ' + str);
  }
}
    
// test suite functions
function describe(str, fn) {
  log('info', str);
  start();
  fn();
  done();
}
    
function it(str, fn) {
  const res = fn(str);
  res.status
    ? log('ok', res.message)
    : log('err', res.message);
}