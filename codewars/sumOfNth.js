/* Task:
Your task is to write a function which returns the sum of following series upto nth term(parameter).

Series: 1 + 1/4 + 1/7 + 1/10 + 1/13 + 1/16 +...
Rules:
You need to round the answer to 2 decimal places and return it as String.

If the given value is 0 then it should return 0.00

You will only be given Natural Numbers as arguments.

Examples:
SeriesSum(1) => 1 = "1.00"
SeriesSum(2) => 1 + 1/4 = "1.25"
SeriesSum(5) => 1 + 1/4 + 1/7 + 1/10 + 1/13 = "1.57"
NOTE: In PHP the function is called series_sum().

*/

function assertEquals(a, e, testName) {
  a === e
    ? console.log(`passed [${testName}]`)
    : console.log(`FAILED [${testName}] expected ${e} but got ${a}`);
}

function SeriesSum(n, total=0)
{
  return n === 0
    ? parseFloat(total).toFixed(2).toString()
    : SeriesSum(n-1, total += (1 / (n * 3 - 2)));
}


assertEquals(SeriesSum(1), "1.00", 'test One');
assertEquals(SeriesSum(2), "1.25", 'test two')
assertEquals(SeriesSum(3), "1.39", 'test three')
assertEquals(SeriesSum(4), "1.49", 'test four')