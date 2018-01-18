/*
You have a fashion catalog, an inventory of items from various high-fashion designers. 
Each designer has a lineup of shoes. Each shoe has a name and a price.

It looks like this:
var currentInventory = [
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

Look up all the shoes across all the designers and list them out in a flat list:{designer name} - {shoe name} - {price}{designer name} - {shoe name} - {price}
E.g.,
Brunello Cucinelli, tasselled black low-top lace-up, 1000
Brunello Cucinelli, tasselled green low-top lace-up, 1100
...

// ^ this implies that the return value is a string, with each new line separated by a newline symbol ('\n')

Write your own unit tests.
*/

function PrintCatalogue(catalogue){
  this.catalogue = catalogue;
}
// returns output of catalogue to console 
PrintCatalogue.prototype.printCatalogue = function() {
  return this.stringify(this.flattenCatalogue());
}
// maps over the shoes and appends the 
PrintCatalogue.prototype.flattenCatalogue = function() {
  let flattened = [];
  
  this.catalogue.forEach(designer => {
    const {shoes, name} = designer;
    shoes.forEach(shoe => {
      shoe['designer'] = name;
      flattened.push(shoe);
    });
  });

  return flattened;
}
// creates string representation from flattened catalogue
PrintCatalogue.prototype.stringify = function(shoes) {
  let str = '';
  shoes.forEach((v,i) => {
    if (i !== 0) {
      str += '\n';
    }
    str += `${v.designer}, ${v.name}, ${v.price}`;
  });
  return str;
}

var testOneCatalogue = [
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

const testOneOutcome = "Brunello Cucinelli, tasselled black low-top lace-up, 1000\n" +
                      "Brunello Cucinelli, tasselled green low-top lace-up, 1100\n" +
                      "Brunello Cucinelli, plain beige suede moccasin, 950\n" +
                      "Brunello Cucinelli, plain olive suede moccasin, 1050\n" +
                      "Gucci, red leather laced sneakers, 800\n" +
                      "Gucci, black leather laced sneakers, 900";

const catalogue = new PrintCatalogue(testOneCatalogue);
const printedCatalogue = catalogue.printCatalogue();

assertEquals(printedCatalogue,testOneOutcome,'should create string representation of catalogue');

function assertEquals(actual, expected, testName) {
  return actual === expected
    ? console.log(`passed [${testName}]`)
    : console.log(`FAILED [${testName}] Expected ${expected}, but got ${actual}`);
}



