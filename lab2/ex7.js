function createChecker(arr) {
    return function(text) {
      return arr.includes(text);
    };
}

const checkText = createChecker(["hello", "world"]);

console.log(checkText("hello"));
console.log(checkText("bye"));
