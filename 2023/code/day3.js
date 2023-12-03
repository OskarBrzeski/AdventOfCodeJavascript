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
    const gears = allGears(lines);

    for (let i = 0; i < lines.length; i++) {
        let number = "";

        for (let j = 0; j <= lines[i].length; j++) {
            if (lines[i][j] >= "0" && lines[i][j] <= "9") {
                number += lines[i][j];
            }
            else if (number.length > 0) {
                let coords = gearAroundNumber(lines, number.length, i, j);
                
                if (coords) {
                    for (let gear of gears) {
                        if (gear.row === coords[0] && gear.col === coords[1]) {
                            gear.numbers.push(Number(number));
                            break;
                        }
                    }
                }
                number = "";
            }
            else {
                number = "";
            }
        }
    }

    let result = 0;

    for (let gear of gears) {
        if (gear.numbers.length === 2) {
            result += gear.numbers[0] * gear.numbers[1];
        }
    }

    return result;
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

function gearAroundNumber(lines, numberLen, i, j) {
    for (let dy = -1; dy <= 1; dy++) {
        if (i + dy < 0) {continue;}
        if (i + dy >= lines.length) {continue;}

        for (let k = 0; k < numberLen+2; k++) {
            if (j - k >= lines[i + dy].length) {continue;}
            if (j - k < 0) {continue;}

            if (lines[i + dy][j - k] === "*") {
                return [i+dy, j-k];
            }        
        }
    }

    return false;
}

function allGears(lines) {
    const gears = [];

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[0].length; j++) {
            if (lines[i][j] === "*") {
                gears.push({
                    row: i,
                    col: j,
                    numbers: [],
                });
            }
        }
    }

    return gears;
}

function isSymbol(char) {
    return !((char >= "0" && char <= "9") || char === ".")
}