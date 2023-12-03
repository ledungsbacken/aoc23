const { log } = require("console");
const readline = require("readline");
const rl = readline.createInterface({
    input: require("fs").createReadStream("input.txt"),
    // input: require("fs").createReadStream("exampleInput2.txt"),
});

let sum = 0;
const stringNumbers = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
};
rl.on("line", function (line) {
    const inputArray = line.split("");

    const numberPair = [];
    let indexFirstNumber = line.length;
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i].match(/\d/) === null) {
            continue;
        }
        indexFirstNumber = i;
        numberPair.push(inputArray[i]);
        break;
    }

    let indexLastNumber = -1;
    for (let i = inputArray.length - 1; i >= 0; i--) {
        if (inputArray[i].match(/\d/) === null) {
            continue;
        }
        indexLastNumber = i;
        numberPair.push(inputArray[i]);
        break;
    }

    let indexFirstStringNumber = line.length;
    let firstStringNumberKey;
    for (const key of Object.keys(stringNumbers)) {
        const index = line.indexOf(key);
        if (index === -1) {
            continue;
        }
        if (index > indexFirstStringNumber) {
            continue;
        }
        indexFirstStringNumber = index;
        firstStringNumberKey = key;
    }

    let indexLastStringNumber = -1;
    let lastStringNumberKey;
    for (const key of Object.keys(stringNumbers)) {
        const index = line.lastIndexOf(key);
        if (index === -1) {
            continue;
        }
        if (index < indexLastStringNumber) {
            continue;
        }
        indexLastStringNumber = index;
        lastStringNumberKey = key;
    }

    let first;
    if (indexFirstNumber < indexFirstStringNumber) {
        first = numberPair[0];
    } else {
        first = stringNumbers[firstStringNumberKey];
    }

    let last;
    if (indexLastNumber > indexLastStringNumber) {
        last = numberPair[1];
    } else {
        last = stringNumbers[lastStringNumberKey];
    }

    sum += parseInt(first + last);
});

rl.on("close", function () {
    console.log(sum);
});
