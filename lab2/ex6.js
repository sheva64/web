function add(a) {
    return function(b) {
        return a + b;
    };
}

console.log(add(2)(3));   // 5
console.log(add(10)(7));  // 17

const add8 = add(8);
console.log(add8(2));     // 10
console.log(add8(5));     // 13