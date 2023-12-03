import * as fs from "fs";

export function solution() {
    fs.readFile("2023/data/day3.txt", "utf8", (err, data) => {
        if (err) throw err;
        parts(data);
    });
}

function parts(fileData) {
    const lines = fileData.split("\n");
    console.log(`Day3: ${part1(lines)} | ${part2(lines)}`)
}

function part1(lines) {
    let result = 0;

    for (let i = 0; i < lines.length; i++) {
        let number = "";

        for (let j = 0; j <= lines[i].length; j++) {
            if (lines[i][j] >= "0" && lines[i][j] <= "9") {
                number += lines[i][j];
            }
            else if (number.length > 0) {
                if (symbolAroundNumber(lines, number.length, i, j)) {
                    result += Number(number);
                }
                number = "";
            }
            else {
                number = "";
            }
        }
    }

    return result;
}

function part2(lines) {
    return 0;
}

function symbolAroundNumber(lines, numberLen, i, j) {
    for (let dy = -1; dy <= 1; dy++) {
        if (i + dy < 0) {continue;}
        if (i + dy >= lines.length) {continue;}

        for (let k = 0; k < numberLen+2; k++) {
            if (j - k >= lines[i + dy].length) {continue;}
            if (j - k < 0) {continue;}

            if (isSymbol(lines[i + dy][j - k])) {
                return true;
            }        
        }
    }

    return false;
}

function isSymbol(char) {
    return !((char >= "0" && char <= "9") || char === ".")
}