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

function Node() {
  this.next = undefined;
}
Node.prototype.getNext = function() {
  return this.next;
}
Node.prototype.setNext = function(node) {
  this.next = node;
}

function constructLoop(totalNodes, tailSize) {
  let startNode = new Node();
  let loopNode, nextNode;
  let currentNode = startNode;
  
  totalNodes--;
  tailSize--;

  while (tailSize >= 0) {
    nextNode = new Node();

    currentNode.setNext(nextNode);
    currentNode = nextNode;

    totalNodes--;
    tailSize--;
  }

  loopNode = currentNode;

  while (totalNodes > 0) {
    nextNode = new Node();
    
    currentNode.setNext(nextNode);
    currentNode = nextNode;

    totalNodes--;
  }

  nextNode.setNext(loopNode);
  
  return startNode;
}

// test loop
const startNode = constructLoop(14, 3);

function loopSize(node){
  
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

assertEquals(loopSize(startNode), 11, 'should find length of loop present in linked list');