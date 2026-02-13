function replaceFirstWord(text, oldWord, newWord) {
    return text.replace(oldWord, newWord);
}

const originalText = "I love JavaScript.";
const result = replaceFirstWord(originalText, "I", "We");

console.log(result);