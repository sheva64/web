function cacheLastCall(fn) {
    let lastArgs = null;
    let lastResult = null;
    let lastTime = 0;
  
    return function (...args) {
      const now = Date.now();
  
      if (
        lastArgs &&
        JSON.stringify(args) === JSON.stringify(lastArgs) &&
        now - lastTime < 10000
      ) {
        console.log("Повернули кеш");
        return lastResult;
      }
  
      lastArgs = args;
      lastTime = now;
      lastResult = fn(...args);
  
      console.log("Новий виклик функції");
      return lastResult;
    };
}

function sum(a, b) {
    return a + b;
}
  
const cachedSum = cacheLastCall(sum);

console.log(cachedSum(2, 6)); // новий виклик
console.log(cachedSum(2, 6)); // має написати "Повернули кеш"
setTimeout(() => console.log(cachedSum(2, 6)), 11000); // виклик через 11 сек (кеш застаріє)