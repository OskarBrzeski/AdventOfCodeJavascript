import * as fs from "fs";

export function solution() {
    let data = fs.readFileSync("2023/data/day4.txt", "utf8");
    parts(data);
}

function parts(fileData) {
    const lines = fileData.split("\n");
    console.log(`Day4: ${part1(lines)} | ${part2(lines)}`)
}

function part1(lines) {
    let result = 0;
    
    for (let line of lines) {
        let amount = matchingAmount(...splitNumbers(line));
        if (amount === 0) {continue;}
        result += Math.pow(2, amount-1);
    }

    return result;
}

function part2(lines) {
    let result = 0;

    const cards = [];
    for (let i = 0; i < lines.length; i++) {
        cards.push(1);
    }

    for (let i = 0; i < lines.length; i++) {
        let amount = matchingAmount(...splitNumbers(lines[i]));

        for (let j = 1; j <= amount; j++) {
            if (cards[i] === undefined) {break;}
            cards[i + j] += cards[i];
        }

        result += cards[i]
    }
    
    return result;
}

function splitNumbers(line) {
    const pastColon = line.slice(10, line.length);
    const [winningLine, mineLine] = pastColon.split(" | ");

    const winning = [];
    const mine = [];

    for (let num of winningLine.split(" ")) {
        if (num === "") {continue;}
        winning.push(Number(num));
    }

    for (let num of mineLine.split(" ")) {
        if (num === "") {continue;}
        mine.push(Number(num));
    }

    return [winning, mine];
}

function matchingAmount(winning, mine) {
    let count = 0;

    for (let win of winning) {
        for (let num of mine) {
            if (num === win) {
                count++;
                break;
            }
        }
    }

    return count;
}