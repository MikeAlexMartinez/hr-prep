/**
 * 
 
 You are given a node that is the beginning of a linked list. This list always contains a tail and a loop.
 
 Your objective is to determine the length of the loop.
 
 For example in the following picture the tail's size is 3 and the loop size is 11.
 
 Image and video hosting by TinyPic
 // Use the `getNext' method or 'next' property to get the following node.
 
 node.getNext()
 node.next
 Thanks to shadchnev, I broke all of the methods from the Hash class.
 
 Don't miss dmitry's article in the discussion after you pass the Kata !!
*/

function Node(i) {
  this.next = undefined;
  this.count = i;
}
Node.prototype.getNext = function() {
  return this.next;
}
Node.prototype.setNext = function(node) {
  this.next = node;
}

function constructLoop(totalNodes, tailSize) {
  let i = 1;
  let startNode = new Node(i++);
  let loopNode, nextNode;
  let currentNode = startNode;
  
  totalNodes--;
  tailSize--;

  while (tailSize >= 0) {
    nextNode = new Node(i++);

    currentNode.setNext(nextNode);
    currentNode = nextNode;

    totalNodes--;
    tailSize--;
  }

  loopNode = currentNode;

  while (totalNodes > 0) {
    nextNode = new Node(i++);
    
    currentNode.setNext(nextNode);
    currentNode = nextNode;

    totalNodes--;
  }

  nextNode.setNext(loopNode);
  
  return startNode;
}

// test loop
const startNode = constructLoop(14, 3);

function loopSizeMutated(node){
  
  let loopDetected = false;
  let loopCount = 0;
  let loopCalced = false;
  let currentNode = node;
  currentNode.label = 'once';
  let nextNode = node.getNext();
  
  while(!loopCalced) {
    if (nextNode.label && !loopDetected) {
      loopDetected = true;
      loopCount = 1;
      currentNode.label = 'stop';
    }
    
    currentNode = nextNode;

    if (!loopDetected) {
      currentNode.label = 'once';
    }

    nextNode = currentNode.getNext();

    if (loopDetected) {
      if (currentNode.label !== 'stop') {
        loopCount++;
        currentNode.label = 'twice';
      } else {
        loopCalced = true;
      }
    }

  }

  return loopCount;
}

// TODO: Replace examples and use TDD development by writing your own tests

// These are some CW specific test methods available:
//    Test.expect(boolean, [optional] message)
//    Test.assertEquals(actual, expected, [optional] message)
//    Test.assertSimilar(actual, expected, [optional] message)
//    Test.assertNotEquals(actual, expected, [optional] message)

// NodeJS assert is also automatically required for you.
//    assert(true)
//    assert.strictEqual({a: 1}, {a: 1})
//    assert.deepEqual({a: [{b: 1}]}, {a: [{b: 1}]})

// You can also use Chai (http://chaijs.com/) by requiring it yourself
// var expect = require("chai").expect;
// var assert = require("chai").assert;
// require("chai").should();
/*
describe("Solution", function(){
  it("should test for something", function(){
    Test.assertEquals("actual", "expected", "This is just an example of how you can write your own TDD tests");
  });
});*/

function assertEquals(a, e, t) {
  a === e
    ? console.log(`passed [${t}]`)
    : console.log(`FAILED [${t}] Expected ${e} but got ${a}`);
}

assertEquals(loopSizeMutated(startNode), 11, 'should find length of loop present in linked list - Mutable');

function loopSizeImmutable(startNode) {

  return countLoop(detectLoop(startNode));
  
  function countLoop(node) {
    
    let currentNode = node.getNext();
    let nodeCount = 1;

    while (currentNode !== node) {
      currentNode = currentNode.getNext();
      nodeCount++;
    }

    return nodeCount;
  }
  
  function detectLoop(node) {
    let bunny = node;
    let hare = bunny.getNext();
    let loopDetected = false;

    while (!loopDetected) {

      bunny = bunny.getNext();
      hare = hare.getNext();

      if ( bunny.getNext() === node.getNext() ) {
        loopDetected = true;
      }

      hare = hare.getNext();
    }

    return bunny;
  }
}

// test loop
const newNode = constructLoop(5, 1);

assertEquals(loopSizeMutated(newNode), 4, 'should find length of loop present in linked list - Mutable');
assertEquals(loopSizeImmutable(newNode), 4, 'should find length of loop present in linked list - Immutable');

function loop_size_array(node) {
  let nodes = [];
  
  while(nodes.indexOf(node) === -1) {
    nodes.push(node);
    node = node.getNext();
  }

  return nodes.length - nodes.indexOf(node);
}

assertEquals(loop_size_array(newNode), 4, 'should find length of loop present in linked list - Array');