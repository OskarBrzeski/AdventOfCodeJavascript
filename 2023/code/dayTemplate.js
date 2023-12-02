import * as fs from "fs";

export function solution() {
    fs.readFile("2023/data/day?.txt", "utf8", (err, data) => {
        if (err) throw err;
        parts(data);
    });
}

function parts(fileData) {
    const lines = fileData.split("\n");
    console.log(`Day1: ${part1(lines)} | ${part2(lines)}`)
}

function part1(lines) {
    return 0;
}

function part2(lines) {
    return 0;
}