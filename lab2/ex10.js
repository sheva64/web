function runWithLog(callback, ...args) {
    const time = new Date().toLocaleString();
  
    console.log("Function name:", callback.name);
    console.log("Arguments:", args);
    console.log("Time:", time);
  
    return callback(...args);
}

function sum(a, b) {
    return a + b;
}

runWithLog(sum, 5, 7);