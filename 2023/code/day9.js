import * as fs from "fs";

export function solution() {
    let data = fs.readFileSync("2023/data/day9.txt", "utf8");
    parts(data);
}

function parts(fileData) {
    const lines = fileData.split("\n");
    console.log(`Day9: ${part1(lines)} | ${part2(lines)}`)
}

function part1(lines) {
    let result = 0;
    
    for (let line of lines) {
        result += findNext(line.split(" ").map(Number));
    }

    return result;
}

function part2(lines) {
    let result = 0;

    for (let line of lines) {
        result += findPrevious(line.split(" ").map(Number));
    }

    return result;
}

function findNext(sequence) {
    let newSequence = [];
    for (let i = 0; i < sequence.length-1; i++) {
        newSequence.push(sequence[i+1] - sequence[i]);
    }

    if (newSequence[0] === newSequence[1] && newSequence[0] === newSequence[2]) {
        return sequence[sequence.length-1] + newSequence[0];
    }

    return sequence[sequence.length-1] + findNext(newSequence);
}

function findPrevious(sequence) {
    let newSequence = [];
    for (let i = 0; i < sequence.length-1; i++) {
        newSequence.push(sequence[i+1] - sequence[i]);
    }

    if (newSequence[0] === newSequence[1] && newSequence[0] === newSequence[2]) {
        return sequence[0] - newSequence[0];
    }

    return sequence[0] - findPrevious(newSequence);
}