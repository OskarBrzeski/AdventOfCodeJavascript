import * as fs from "fs";

export function solution() {
    let data = fs.readFileSync("2023/data/day1.txt", "utf8");
    parts(data);
}

function parts(fileData) {
    const lines = fileData.split("\n");
    console.log(`Day1: ${part1(lines)} | ${part2(lines)}`)
}

function part1(lines) {
    let result = 0;

    for (let line of lines) {
        let digits = [];

        for (let char of line) {
            if (char >= "0" && char <= "9") {
                digits.push(Number(char));
            }
        }

        result += digits[0] * 10 + digits[digits.length-1];
    }

    return result;
}

function part2(lines) {
    let result = 0;

    for (let line of lines) {
        let digits = [];

        for (let i = 0; i < line.length; i++) {
            let num = toNumber(line.slice(i, i+5))
            if (num !== null) {
                digits.push(num);
            }
        }

        result += digits[0] * 10 + digits[digits.length-1];
    }

    return result;
}

function toNumber(text) {
    if (text[0] >= "0" && text[0] <= "9") return Number(text[0]);
    else if (text.slice(0, 4) === "zero") return 0;
    else if (text.slice(0, 3) === "one") return 1;
    else if (text.slice(0, 3) === "two") return 2;
    else if (text.slice(0, 5) === "three") return 3;
    else if (text.slice(0, 4) === "four") return 4;
    else if (text.slice(0, 4) === "five") return 5;
    else if (text.slice(0, 3) === "six") return 6;
    else if (text.slice(0, 5) === "seven") return 7;
    else if (text.slice(0, 5) === "eight") return 8;
    else if (text.slice(0, 4) === "nine") return 9;
    else return null;
}