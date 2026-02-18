const operation = process.argv[2];
const num1 = Number(process.argv[3]);
const num2 = Number(process.argv[4]);

let result;

switch (operation) {
    case 'add':
        result = num1 + num2;
        break;
    case 'sub':
        result = num1 - num2;
        break;
    case 'mul':
        result = num1 * num2;
        break;
    case 'div':
        result = num2 !== 0 ? num1 / num2 : "Error (div by zero)";
        break;
    default:
        result = "Unknown operation";
}

console.log(`Result = ${result}`);