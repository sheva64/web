const args = process.argv.slice(2);

const sum = args.reduce((acc, current) => {
    return acc + Number(current);
}, 0);

console.log(`Sum = ${sum}`);