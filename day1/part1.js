const readline = require("readline");
const rl = readline.createInterface({
    input: require("fs").createReadStream("input.txt"),
    // input: require("fs").createReadStream("exampleInput.txt"),
});

let sum = 0;
rl.on("line", function (line) {
    const numbers = line.split("").filter((e) => e.match(/\d/) !== null);
    const first = numbers[0];
    const last = numbers[numbers.length - 1];
    sum += parseInt(first + last);
});

rl.on("close", function () {
    console.log(sum);
});
