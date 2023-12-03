const readline = require("readline");
const rl = readline.createInterface({
    input: require("fs").createReadStream("input.txt"),
    // input: require('fs').createReadStream('exampleInput.txt'),
});

rl.on("line", function (line) {
    console.log(line);
});

rl.on("close", function () {});
