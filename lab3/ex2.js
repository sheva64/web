function invokeAfterDelay(callback, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            const result = callback();
            resolve(result);
        }, delay)
    }
    )
}

const getRandom = () => Math.floor(Math.random() * 11);

const produceRandomAfterDelay = delay => {
    return invokeAfterDelay(getRandom, delay);
}

Promise.all([
    produceRandomAfterDelay(3000),
    produceRandomAfterDelay(3000)
])
.then(([num1, num2]) => {
    console.log(`First number: ${num1}`);
    console.log(`Second number: ${num2}`);
    console.log(`Sum: ${num1 + num2}`);
});