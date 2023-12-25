import * as fs from "fs";

export function solution() {
    let data = fs.readFileSync("2023/data/day11.txt", "utf8");
    parts(data);
}

function parts(fileData) {
    const lines = fileData.split("\n");
    console.log(`Day11: ${part1(lines)} | ${part2(lines)}`)
}

function part1(lines) {
    lines = expandSpace(lines);
    const galaxies = findGalaxies(lines);

    let result = 0;
    let dx, dy;

    for (let i = 0; i < galaxies.length-1; i++) {
        for (let next of galaxies.slice(i+1)) {
            dx = Math.abs(galaxies[i][0] - next[0])
            dy = Math.abs(galaxies[i][1] - next[1])
            result += (dx + dy);
        }
    }

    return result;
}

function part2(lines) {
    const emptyRows = findEmptyRows(lines);
    const emptyColumns = findEmptyColumns(lines);
    const galaxies = findGalaxies(lines);

    let result = 0;
    let dx, dy;
    for (let i = 0; i < galaxies.length-1; i++) {
        for (let next of galaxies.slice(i+1)) {
            dx = Math.abs(galaxies[i][0] - next[0])
            dy = Math.abs(galaxies[i][1] - next[1])

            for (let col of emptyColumns) {
                if (col > Math.min(galaxies[i][0], next[0]) && col < Math.max(galaxies[i][0], next[0])) {
                    dx += 999999;
                }
            }

            for (let row of emptyRows) {
                if (row > Math.min(galaxies[i][1], next[1]) && row < Math.max(galaxies[i][1], next[1])) {
                    dy += 999999;
                }
            }

            result += (dx + dy);
        }
    }

    return result;
}

function expandSpace(lines) {
    const newLines = deepClone(lines);
    let x = -1;
    let skip = false;
    while (x < newLines[0].length-1) {
        x++;
        for (let y = 0; y < newLines.length; y++) {
            if (newLines[y][x] === "#") {skip = true;}
        }

        if (skip) {skip = false; continue;}

        for (let y = 0; y < newLines.length; y++) {
            newLines[y] = newLines[y].slice(0, x+1) + "." + newLines[y].slice(x+1);
        }
        x++;
    }

    let y = -1;
    while (y < newLines.length-1) {
        y++;
        for (let x = 0; x < newLines[y].length; x++) {
            if (newLines[y][x] === "#") {skip = true;}
        }

        if (skip) {skip = false; continue;}

        newLines.splice(y, 0, newLines[y]);
        y++;
    }

    return newLines;
}

function deepClone(lines) {
    const newLines = [];
    for (let line of lines) {
        newLines.push(line);
    }
    return newLines;
}

function findGalaxies(lines) {
    const galaxies = [];
    
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] === "#") {
                galaxies.push([x, y]);
            }
        }
    }

    return galaxies
}

function findEmptyRows(lines) {
    const emptyRows = [];

    let y = -1;
    let skip = false;
    while (y < lines.length-1) {
        y++;
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] === "#") {skip = true; break;}
        }

        if (skip) {skip = false; continue;}

        emptyRows.push(y);
    }

    return emptyRows;
}

function findEmptyColumns(lines) {
    const emptyColumns = [];

    let x = -1;
    let skip = false;
    while (x < lines[0].length-1) {
        x++;
        for (let y = 0; y < lines.length; y++) {
            if (lines[y][x] === "#") {skip = true; break;}
        }

        if (skip) {skip = false; continue;}

        emptyColumns.push(x);
    }

    return emptyColumns;
}