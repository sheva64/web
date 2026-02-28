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

invokeAfterDelay(getRandom, 3000)
.then((number) => {
    console.log(`Random number: ${number}`);
})