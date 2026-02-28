function logCall(callback) {
    return new Promise((resolve) => {
        setTimeout(() => {
            callback();
            console.log(`Time: ${new Date().toLocaleTimeString()}`);
            resolve();
        }, 1000)
    })
}

logCall(() => console.log("Call 1"))
.then(() => logCall(() => console.log("Call 2")))
.then(() => logCall(() => console.log("Call 3")))
.then(() => logCall(() => console.log("Call 4")))
.then(() => console.log("All calls finished"));