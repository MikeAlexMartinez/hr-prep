/*
This is a variation of the "Fashion Inventory" problem.

Please DO NOT paste code from before, however. Tackle each problem on its own.

It's the same inventory data structure:

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

The task now is to find all the laced shoes.
Output shoe names that contain "lace" in them, and indicate which word contains "lace".

The output format should be structured like this:

[
  {
    "nameWords": [
      "tasselled",
      "black",
      "low-top",
      "lace-up"
    ],
    "targetWordIndex": 3
  },
  {
    "nameWords": [
      "tasselled",
      "green",
      "low-top",
      "lace-up"
    ],
    "targetWordIndex": 3
  },
  {
    "nameWords": [
      "red",
      "leather",
      "laced",
      "sneakers"
    ],
    "targetWordIndex": 2
  },
  {
    "nameWords": [
      "black",
      "leather",
      "laced",
      "sneakers"
    ],
    "targetWordIndex": 2
  }
]

Assert the validity of the values and structure of your output.

*/

const inventory = [
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

const expected = [
  {
    "nameWords": [
      "tasselled",
      "black",
      "low-top",
      "lace-up"
    ],
    "targetWordIndex": 3
  },
  {
    "nameWords": [
      "tasselled",
      "green",
      "low-top",
      "lace-up"
    ],
    "targetWordIndex": 3
  },
  {
    "nameWords": [
      "red",
      "leather",
      "laced",
      "sneakers"
    ],
    "targetWordIndex": 2
  },
  {
    "nameWords": [
      "black",
      "leather",
      "laced",
      "sneakers"
    ],
    "targetWordIndex": 2
  }
];

function logger(bool, {actual, expected, testName}) {
  bool
    ? console.log(`passed [${testName}]`)
    : console.log(`FAILED [${testName}] Expected ${expected}, but received ${actual}`);
}

function assertEquals(actual, expected, testName) {
  return logger(actual === expected, {actual, expected, testName});
}
function assertDeepEquals(actual, expected, testName) {
  return logger(equal(actual, expected), {actual, expected, testName});

  function equal(a, b) {
    if (a === b) return true;

    const arrA = Array.isArray(a);
    const arrB = Array.isArray(b);
    if (arrA && arrB) {
      if( a.length !== b.length ) return false;
      for(let i = 0; i < a.length; i++) {
        if (!equal(a[i],b[i])) return false;
      }
      return true;
    }
    if (arrA !== arrB) return false;

    if (a && b && typeof a === 'object' && typeof b === 'object') {
      const keys = Object.keys(a);

      if (keys.length !== Object.keys(b).length) return false;

      keys.forEach(key => {
        if ( !b.hasOwnProperty(key) ) return false;
      });

      keys.forEach(key => {
        if ( !equal(a[key],b[key]) ) return false;
      });

      return true;
    }

    return false;
  }
}


// fashion catalog constructor 
// has original catalog, flattened items, and filter object
function FashionCatalog(inventory) {
  this.catalog = inventory;
  this.items = this.flattenedItems();
  this.textFilters = {
    product: '',
    designer: '',
  };
}
FashionCatalog.prototype.flattenedItems = function() {
  let flatArray = [];

  this.catalog.forEach(({name: designer, shoes}) => {
    shoes.map(({name, price}) => {
      flatArray.push({
        designer: designer,
        product: name,
        price: price
      });
    });
  }); 

  return flatArray;
}
FashionCatalog.prototype.applyTextFilter = function(filter, type) {
  this.textFilters[type] = filter;

  return this;
}
FashionCatalog.prototype.filterItems = function(key) {
  const re = new RegExp(this.textFilters[key]);

  const filteredItems = this.items.filter(item => {
    return re.test(item[key]);
  });

  return filteredItems;
}
FashionCatalog.prototype.splitProductNames = function(text) {
  return text.split(' ');
}
FashionCatalog.prototype.getTargetNameIndex = function(array, filter) {
  return array.indexOf(filter);
}
FashionCatalog.prototype.productSearchWithIndex = function() {
  let filteredItems = this.filterItems('product');

  return filteredItems.map(item => {
    const nameWords = this.splitProductNames(item.product);
    const index = this.getTargetNameIndex(nameWords, this.textFilters.product);

    return {
      nameWords: nameWords,
      targetWordIndex: index
    };
  });
}

// flattenedItems test
const testOneExpected = [
  {designer: 'Brunello Cucinelli', product: 'tasselled black low-top lace-up', price: 1000},
  {designer: 'Brunello Cucinelli', product: 'tasselled green low-top lace-up', price: 1100},
  {designer: 'Brunello Cucinelli', product: 'plain beige suede moccasin', price: 950},
  {designer: 'Brunello Cucinelli', product: 'plain olive suede moccasin', price: 1050},
  {designer: 'Gucci', product: 'red leather laced sneakers', price: 800},
  {designer: 'Gucci', product: 'black leather laced sneakers', price: 900}
];

const testObj = {
  catalog: inventory
}

const testOneOutcome = FashionCatalog.prototype.flattenedItems.apply(testObj);

assertDeepEquals(testOneOutcome, testOneExpected, 'should create flattened array of product items from inventory')

const catalog = new FashionCatalog(inventory);

// test applyTextFilter
const test = new FashionCatalog(inventory).applyTextFilter('lace', 'product');

assertEquals(test.textFilters.product,'lace','should have set the textFilters.product property to \'lace\'');

// main filter 
const filterTest = new FashionCatalog(inventory).applyTextFilter('red', 'product').filterItems('product');

const filterTestExpected = [{designer: 'Gucci', product: 'red leather laced sneakers', price: 800}];

assertDeepEquals(filterTest,filterTestExpected,'should return flattened items filtered as expected');

// test split
const testSplit = 'this is a test';
const testSplitExpected = ['this','is','a','test'];

assertDeepEquals(test.splitProductNames(testSplit), testSplitExpected, 'should return the string with words split into separate items');

// test indexing function
assertEquals(test.getTargetNameIndex(testSplitExpected, 'test'), 3, 'should return 0-based index of target word');

// main test
const mainTest = catalog.applyTextFilter('lace', 'product')
                        .productSearchWithIndex();

assertDeepEquals(mainTest, expected, 'should return properly formatted products with indexes');