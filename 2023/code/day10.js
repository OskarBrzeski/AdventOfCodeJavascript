import * as fs from "fs";

export function solution() {
    let data = fs.readFileSync("2023/data/day10.txt", "utf8");
    parts(data);
}

function parts(fileData) {
    const lines = fileData.split("\n");
    console.log(`Day10: ${part1(lines)} | ${part2(lines)}`)
}

function part1(lines) {
    let [currentX, currentY] = findStart(lines);
    let first = {x: currentX, y: currentY, direction: "left", distance: 0};
    let second = {x: currentX, y: currentY, direction: "right", distance: 0};

    let newX, newY, newDir;
    do {
        [newX, newY, newDir] = nextCoords(first.x, first.y, lines[first.y][first.x], first.direction);
        first.x = newX;
        first.y = newY
        first.direction = newDir;
        first.distance += 1;

        [newX, newY, newDir] = nextCoords(second.x, second.y, lines[second.y][second.x], second.direction);
        second.x = newX;
        second.y = newY;
        second.direction = newDir;
        second.distance += 1;
    } while (first.x !== second.x || first.y !== second.y);

    return first.distance;
}

function part2(lines) {
    const parts = getPartsOfLoop(lines);
    let result = 0;

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (parts[`${x},${y}`]) {continue;}

            result += isInLoop(x, y, parts, lines);
        }
    }

    return result;
}

function findStart(lines) {
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] === "S") {
                return [x, y];
            }
        }
    }
}

function nextCoords(x, y, char, direction) {
    switch (char) {
        case "S":
        case "-":
            if (direction === "left") {return [x-1, y, "left"];}
            else {return [x+1, y, "right"];}
        case "|":
            if (direction === "up") {return [x, y-1, "up"];}
            else {return [x, y+1, "down"];}
        case "L":
            if (direction === "left") {return [x, y-1, "up"];}
            else {return [x+1, y, "right"];}
        case "J":
            if (direction === "right") {return [x, y-1, "up"];}
            else {return [x-1, y, "left"];}
        case "7":
            if (direction === "right") {return [x, y+1, "down"];}
            else {return [x-1, y, "left"];}
        case "F":
            if (direction === "left") {return [x, y+1, "down"];}
            else {return [x+1, y, "right"];}
    }
}

function getPartsOfLoop(lines) {
    const parts = {};

    let [x, y] = findStart(lines);
    parts[`${x},${y}`] = true;
    const current = {x: x, y: y, direction: "right"};

    let newX, newY, newDir;
    do {
        [newX, newY, newDir] = nextCoords(current.x, current.y, lines[current.y][current.x], current.direction);
        current.x = newX;
        current.y = newY;
        current.direction = newDir;
        parts[`${newX},${newY}`] = true;
    } while (current.x !== x || current.y !== y);

    return parts;
}

function isInLoop(x, y, parts, lines) {
    //console.log(y, x);
    let path = "";
    let count = 0;
    while (x < lines[y].length) {
        x++;
        if (parts[`${x},${y}`]) {
            path += lines[y][x];
            if (lines[y][x] === "-") {continue;}
            
            if (lines[y][x] === "7") {
                for (let dx = 1; dx <= x; dx++) {
                    if (lines[y][x-dx] === "-") {continue;}
                    if (lines[y][x-dx] === "L") {count--; break;}
                    else {break;}
                }
            }
            if (lines[y][x] === "J") {
                for (let dx = 1; dx <= x; dx++) {
                    if (lines[y][x-dx] === "-") {continue;}
                    if (lines[y][x-dx] === "F") {count--; break;}
                    else {break;}
                }
            }

            count++;
        } else {path += "X"}
    }
    //console.log(path, count%2);
    return count % 2;
}

function printLoop(parts, lines) {
    let line = "";

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (parts[`${x},${y}`]) {
                switch (lines[y][x]) {
                    case "S": case "-": line += "─"; break;
                    case "|": line += "│"; break;
                    case "J": line += "┘"; break;
                    case "7": line += "┐"; break;
                    case "L": line += "└"; break;
                    case "F": line += "┌"; break;
                }
            }
            else {line += "X"}
        }
        line += "\n";
    }

    fs.writeFileSync("testloop.txt", line)
}