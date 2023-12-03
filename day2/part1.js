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
    const possibleIds = [];
    for (const game of games) {
        if (isGamePossible(game)) {
            possibleIds.push(game.id);
        }
    }

    const sum = possibleIds.reduce((a, b) => a + b);
    console.log(sum);
});

function isGamePossible(game) {
    const rounds = game.rounds;
    for (const round of rounds) {
        const colors = Object.keys(round);
        for (const color of colors) {
            const number = round[color];
            if (number > maxColors[color]) {
                return false;
            }
        }
    }
    return true;
}
