function fib(i, current=0, next=1) {
  return i <= 1
    ? current
    : fib(i-1, next, next += current);
}

for( let i = 0; i < 10; i++) {
  console.log(fib(i));
}