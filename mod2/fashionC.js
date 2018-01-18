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

Now find all the black shoes. It's the same output as part 1, but filtered to only shoe names that contain "black" in them.

Brunello Cucinelli,tasselled black low-top lace-up,1000
Gucci,black leather laced sneakers,900
etc

Write your own unit tests.

*/

function assertEquals(actual, expected, testName) {
  return actual === expected
    ? console.log(`passed [${testName}]`)
    : console.log(`FAILED [${testName}] Expected ${expected}, but got ${actual}`);
}

function FashionCatalogue(catalogue){
  this.catalogue = catalogue;
  this.itemFilter = '';
}
FashionCatalogue.prototype.renderCatalogue = function() {
  let items = this.filterItems(this.flattenCatalogue());
  
  return this.renderString(items);
}
FashionCatalogue.prototype.setItemFilter = function(filter) {
  this.itemFilter = filter;

  return this;
}
FashionCatalogue.prototype.flattenCatalogue = function() {
  let flatItems = [];

  this.catalogue.forEach(function({name, shoes}) {
    shoes.forEach(shoe => {
      shoe['designer'] = name;
      flatItems.push(shoe);
    });
  }, this);

  return flatItems;
}
FashionCatalogue.prototype.filterItems = function(flatItems) {
  
  if (this.itemFilter) {
    const re = new RegExp(this.itemFilter);
    
    return flatItems.filter(shoe => {
      return re.test(shoe.name);
    });
  }

  return flatItems;
  
}
FashionCatalogue.prototype.renderString = function(flatItems) {
  return flatItems.map(shoe => {
    return `${shoe.designer}, ${shoe.name}, ${shoe.price}`;
  }).join('\n');
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

const expected = 'Brunello Cucinelli, tasselled black low-top lace-up, 1000\n' +
                 'Gucci, black leather laced sneakers, 900';

const catalogue = new FashionCatalogue(inventory);

const output = catalogue.setItemFilter('black').renderCatalogue();

// tests 

assertEquals(output.split('\n').length, 2, 'output should have a length of 2');
assertEquals(typeof output, 'string', 'should return a string');
assertEquals(output, expected, 'should return the a string with only black items');