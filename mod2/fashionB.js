/*

This is a variation of the "Fashion Inventory" problem.

Please DO NOT paste code from before, however. Tackle each problem on its own.

It's the same inventory data structure as earlier:

var inventory = [
  {
    name: 'Brunello Cucinelli',
    shoes: [
      {name: 'tasselled black low-top lace-up', price: 1000},
      {name: 'tasselled green low-top lace-up', price: 1100},
      {name: 'plain beige suede moccasin', price: 950},
      {name: 'plain olive suede moccasin', price: 1050}
    ]
  },
  {
    name: 'Gucci',
    shoes: [
      {name: 'red leather laced sneakers', price: 800},
      {name: 'black leather laced sneakers', price: 900}
    ]
  }
];

Now output the average cost of all shoes per designer in this format:

var expected = {
  'designers': [
    {
      'name': 'Brunello Cucinelli',
      'averagePrice': 1025
    },
    {
      'name': 'Gucci',
      'averagePrice': 850
    }
  ]
};

Write your own unit tests.

*/

function assertEquals(actual, expected, testName) {
  return actual === expected
    ? console.log(`passed [${testName}]`)
    : console.log(`FAILED [${testName}] Expected ${expected}, but got ${actual}`);
}

var inventory = [
  {
    name: 'Brunello Cucinelli',
    shoes: [
      {name: 'tasselled black low-top lace-up', price: 1000},
      {name: 'tasselled green low-top lace-up', price: 1100},
      {name: 'plain beige suede moccasin', price: 950},
      {name: 'plain olive suede moccasin', price: 1050}
    ]
  },
  {
    name: 'Gucci',
    shoes: [
      {name: 'red leather laced sneakers', price: 800},
      {name: 'black leather laced sneakers', price: 900}
    ]
  }
];

var expected = {
  'designers': [
    {
      'name': 'Brunello Cucinelli',
      'averagePrice': 1025
    },
    {
      'name': 'Gucci',
      'averagePrice': 850
    }
  ]
};

function fetchDesignerAverages(inventory) {
  let designers = [];
  
  // For each item in inventory
  inventory.forEach(({name, shoes}) => {
    // extract average price of all shoes for that designer
    designers.push({
      name,
      averagePrice: averagePriceOfShoes(shoes)
    });
  });

  // return output in expected format
  return {
    designers
  };
}

function averagePriceOfShoes(shoeArray) {
  return sumShoes(shoeArray) / shoeArray.length;
}
function sumShoes(shoeArray) {
  // returns total cost of shoes
  return shoeArray.reduce((total, shoe) => total + shoe.price, 0);
}

// sumShoes tests
const shoes = [{price: 100},{price: 200},{price: 300}];
assertEquals(sumShoes(shoes), 600, 'should return total sum of the price of the shoes passed in an array.');

// averagePriceOfShoes
assertEquals(averagePriceOfShoes(shoes), 200, 'should return the average price of shoes passed in an array.')

// main tests
const output = fetchDesignerAverages(inventory);

assertEquals(Object.keys(output).length, 1, 'function should return object with single key');
assertEquals(output.hasOwnProperty('designers'), true, 'function should return object with single key called designers');

assertEquals(output['designers'].length, 2, 'designers array in output should have a length of 2');

assertEquals(typeof output.designers[0].name,'string','first item in designers array should contain contain a property called \'name\' which returns a string');
assertEquals(typeof output.designers[0].averagePrice,'number','first item in designers array should contain contain a property called \'averagePrice\' which returns a number');

assertDeepEquals(output, expected, 'output should match expected output');

function assertDeepEquals(actual, expected, testName) {

  return equal(actual, expected)
    ? console.log(`passed [${testName}]`)
    : console.log(`FAILED [${testName}] Expected ${expected}, but got ${actual}`);

  // simple deepEqual function
  // ignores date value and regexp optimisations
  function equal(a,b) {
    if (a === b) return true

    // test for array
    const arrA = Array.isArray(a);
    const arrB = Array.isArray(b);
    if (arrA && arrB) {
      if (a.length !== b.length) return false;
      for( let i = 0; i < a.length; i++) {
        if (!equal(a[i],b[i])) return false;
      }
      return true
    }
    if (arrA !== arrB) return false

    // test for object
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      const keys = Object.keys(a);

      if (keys.length !== Object.keys(b).length) return false;

      keys.forEach(key => {
        if (!b.hasOwnProperty(key)) return false;
      });

      keys.forEach(key => {
        if (!equal(a[key],b[key])) return false;
      })

      return true;

    }

    return false;
  }
}