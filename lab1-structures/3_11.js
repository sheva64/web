function isJavaScriptFile(filename) {
    return filename.endsWith('.js');
}

console.log(isJavaScriptFile("script.js"));
console.log(isJavaScriptFile("index.html"));
console.log(isJavaScriptFile("main.js.txt"));