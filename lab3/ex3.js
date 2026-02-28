function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

await sleep(1000)
.then(() => { console.log("1 second passed") });