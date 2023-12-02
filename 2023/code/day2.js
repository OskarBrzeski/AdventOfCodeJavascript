import * as fs from "fs";

export function solution() {
    fs.readFile("2023/data/day2.txt", "utf8", (err, data) => {
        if (err) throw err;
        parts(data);
    });
}

function parts(fileData) {
    const lines = fileData.split("\n");
    console.log(`Day2: ${part1(lines)} | ${part2(lines)}`)
}

function part1(lines) {
    let result = 0;

    for (let line of lines) {
        let stats = evalLine(line);

        if (stats.red <= 12 && stats.green <= 13 && stats.blue <= 14) {
            result += stats.id;
        }
    }

    return result;
}

function part2(lines) {
    let result = 0;

    for (let line of lines) {
        let stats = evalLine(line);
        result += stats.red * stats.green * stats.blue;
    }

    return result;
}

function evalLine(line) {
    let [id, game] = line.split(": ");
    id = Number(id.slice(5, 8));

    const gameStats = {
        id: id,
        red: 0,
        green: 0,
        blue: 0,
    }

    const games = game.split("; ");
    for (let g of games) {
        let cubes = g.split(", ");
        for (let c of cubes) {
            let [amount, colour] = c.split(" ");
            amount = Number(amount);
            if (colour === "red" && amount > gameStats.red) {
                gameStats.red = amount;
            } else if (colour === "green" && amount > gameStats.green) {
                gameStats.green = amount;
            } else if (colour === "blue" && amount > gameStats.blue) {
                gameStats.blue = amount;
            }
        }
    }

    return gameStats;
}