/*

Shortest code : Tidy up the room
(Code length limit: 120 chars)

This is the challenge version of coding three minutes series. If you feel difficult, please complete the simple version

Task:
Give you a room(n x n metrix), there are some sundries(any character except spaces). Our task is to put the sundries neatly placed in the upper left corner of the room(a small metrix)

Example:
example1:

    room:[
    ["a"," "," "," "," "],
    [" "," ","b"," "," "],
    [" "," "," "," "," "],
    [" ","c"," "," "," "],
    [" "," ","d"," "," "]
    ]
There are 4 sundries in the room(a,b,c,d), so we put them in the 2x2 matrix, output should be:

    [
    ["a","b"," "," "," "],
    ["c","d"," "," "," "],
    [" "," "," "," "," "],
    [" "," "," "," "," "],
    [" "," "," "," "," "]
    ]
example2:

    room:[
    ["a"," "," "," "," "],
    [" "," ","b"," "," "],
    [" "," "," "," "," "],
    [" ","c"," "," "," "],
    [" "," ","d","e"," "]
    ]
There are 5 sundries in the room(a,b,c,d,e), they cannot be put into the 2x2 matrix, so we put them in the 3x3 matrix, output should be:

    [
    ["a","b","c"," "," "],
    ["d","e"," "," "," "],
    [" "," "," "," "," "],
    [" "," "," "," "," "],
    [" "," "," "," "," "]
    ]
More example see at the testcase.

Code length calculation
In javascript, we can't get the user's real code, we can only get the system compiled code. Code length calculation is based the compiled code.

For example:

If you typed sc=x=>x+1
after compile, it will be:sc=function(x){return x+1;}

*/

function sc(r){
  t=[]
  // get all elements that need 'tidying'
    // loop through arrays,
      // place values in temp array
      // replace value with " "
  r.forEach(function(f,i){
    f.forEach(function(g,j){
      if(g!=" "){
        t.push(g);
        r[i][j]=" ";
      }
    });
  });
    
  // figure out size of cube to place in
    // calculate sqrt of length of temp array.
    // round up to integer
  m=Math.ceil(Math.sqrt(t.length));

  // place in original array
  k=0;
  for(i=0;i<m;i++){
    for(j=0;j<m;j++){
      r[i][j]=t[k]?t[k]:" ";
      k++;
    }
  }

  // return
  return r;
}

function s(r){
t = (''+r).match(/[^ ,]/g)||[], k = 0;
for(i in r) for(j in r) r[i][j] = j*j < t.length && t[k++] || ' ';
return r;
}

var room=[
  [" "," "," "," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "]
  ],
  answer=[
  [" "," "," "," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "]
  ]
assertDeepEquals(s(room), answer, "good luck!");
  room=[
  ["a"," "," "," "," "],
  [" "," ","b"," "," "],
  [" "," "," "," "," "],
  [" ","c"," "," "," "],
  [" "," "," "," "," "]
  ];
  answer=[
  ["a","b"," "," "," "],
  ["c"," "," "," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "]
  ];
assertDeepEquals(s(room), answer, "good luck!");
  room=[
  ["a"," "," "," "," "],
  [" "," ","b"," "," "],
  [" "," "," "," "," "],
  [" ","c"," "," "," "],
  [" "," ","d"," "," "]
  ];
  answer=[
  ["a","b"," "," "," "],
  ["c","d"," "," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "]
  ]
assertDeepEquals(s(room), answer, "good luck!");
  room=[
  ["a","b"," "," "," "],
  [" ","c","d"," "," "],
  [" "," ","e"," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "]
  ];
  answer=[
  ["a","b","c"," "," "],
  ["d","e"," "," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "]
  ]
assertDeepEquals(s(room), answer, "good luck!");
  room=[
  ["a","b"," "," "," "],
  [" ","c","d"," "," "],
  [" "," ","e","f"," "],
  [" "," "," ","g","h"],
  ["i","j","k"," "," "]
  ];
  answer=[
  ["a","b","c","d"," "],
  ["e","f","g","h"," "],
  ["i","j","k"," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "]
  ]
assertDeepEquals(s(room), answer, "good luck!");
  room=[
  ["1","2","3"," "," "],
  [" ","6","5","4"," "],
  [" "," ","7","9","8"],
  [" "," "," "," "," "],
  [" "," "," "," "," "]];
  answer=[
  ["1","2","3"," "," "],
  ["6","5","4"," "," "],
  ["7","9","8"," "," "],
  [" "," "," "," "," "],
  [" "," "," "," "," "]]
  
assertDeepEquals(s(room), answer, "good luck!");

function logger(bool, a, e, t) {
  bool
    ? console.log(`passed [${t}]`)
    : console.log(`FAILED [${t}]\n  Expected:\n    ${e}\n  But received:\n    ${a}`);
};

function assertDeepEquals(actual, expected, testName) {
  return logger(equal(actual, expected), actual, expected, testName);

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