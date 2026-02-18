function createCounter() {
    let count = 0;
    return {
      increment: function() {
        count++;
      },
      getValue: function() {
        return count;
      }
    };
}

const myCounter = createCounter();

console.log(myCounter.getValue());
myCounter.increment();
console.log(myCounter.getValue());
myCounter.increment();
console.log(myCounter.getValue());