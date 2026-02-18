const args = process.argv.slice(2); // process.argv - це масив, який містить усе, що вводиться в командний рядок

args.forEach(arg => {
    console.log(`ARG:${arg}`);
});