/*

Jenny has written a function that returns a greeting for a user. However, she's in love with Johnny, and would like to greet him slightly different. She added a special case to her function, but she made a mistake.

Can you help her?

*/

function greet(name){
  if(name === "Johnny")
    return "Hello, my love!";
  return "Hello, " + name + "!";
}


function assertEquals(a, e, testName) {
  a === e
    ? console.log(`passed [${testName}]`)
    : console.log(`FAILED [${testName}]\n  Expected:\n    ${e}, but got:\n    ${a}`);
}

assertEquals(greet("Jim"), "Hello, Jim!");
assertEquals(greet("Jane"), "Hello, Jane!");
assertEquals(greet("Simon"), "Hello, Simon!");
assertEquals(greet("Johnny"), "Hello, my love!");
