const readline = require("readline");
const rl = readline.createInterface({
    input: require("fs").createReadStream("input.txt"),
    // input: require("fs").createReadStream("exampleInput.txt"),
});

maxColors = {
    red: 12,
    green: 13,
    blue: 14,
};

const games = [];
rl.on("line", function (line) {
    const game = {};
    const gameId = parseInt(line.split(" ")[1].split(":")[0]);
    const sets = line.split(": ")[1].split("; ");
    const rounds = [];
    for (const set of sets) {
        const parts = set.split(", ");
        const round = {};
        for (const part of parts) {
            const pairs = part.split(" ");
            const number = parseInt(pairs[0]);
            const color = pairs[1];
            round[color] = number;
        }
        rounds.push(round);
    }
    game.id = gameId;
    game.rounds = rounds;
    games.push(game);
});

rl.on("close", function () {
    const gameColorNumbers = [];
    for (const game of games) {
        const colors = Object.keys(maxColors);
        const numsPerColor = {};
        for (const color of colors) {
            const nums = game.rounds.map((round) => round[color]);
            numsPerColor[color] = nums;
        }
        gameColorNumbers.push(numsPerColor);
    }

    const powers = [];
    for (const gameColorNumber of gameColorNumbers) {
        const values = Object.values(gameColorNumber);
        const numbers = values
            .map((e) => e.filter((f) => f !== undefined))
            .map((e) => Math.max(...e));
        const product = numbers.reduce((a, b) => a * b);
        powers.push(product);
    }
    const sum = powers.reduce((a, b) => a + b);

    console.log(sum);
});
