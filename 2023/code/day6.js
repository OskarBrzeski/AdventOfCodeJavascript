import * as fs from "fs";

export function solution() {
    fs.readFile("2023/data/day6.txt", "utf8", (err, data) => {
        if (err) throw err;
        parts(data);
    });
}

function parts(fileData) {
    const lines = fileData.split("\n");
    console.log(`Day6: ${part1(lines)} | ${part2(lines)}`)
}

function part1(lines) {
    const races = getRaces(lines);
    
    let result = 1;

    for (let race of races) {
        let waysToWin = 0;

        for (let i = 0; i < race.time; i++) {
            if (i * (race.time - i) > race.distance) {
                waysToWin += 1;
            }
        }

        result *= waysToWin;
    }

    return result;
}

function part2(lines) {
    const race = getRace(lines);
    
    for (let i = 0; i < race.time; i++) {
        if (i * (race.time - i) > race.distance) {
            return race.time - 2 * i + 1;
        }
    }

    return 0;
}

function getRaces(lines) {
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);

    const times = [];
    for (let time of lines[0].split(" ").slice(1)) {
        if (time === "") {continue;}
        times.push(Number(time));
    }

    const distances = [];
    for (let distance of lines[1].split(" ").slice(1)) {
        if (distance === "") {continue;}
        distances.push(Number(distance));
    }

    const races = [];
    for (let [time, distance] of zip(times, distances)) {
        races.push( {
            time: time,
            distance: distance,
        } );
    }

    return races;
}

function getRace(lines) {
    let time = "";
    for (let char of lines[0].split(":")[1]) {
        if (char === " ") {continue;}
        time += char;
    }

    let distance = "";
    for (let char of lines[1].split(":")[1]) {
        if (char === " ") {continue;}
        distance += char;
    }

    return {
        time: Number(time),
        distance: Number(distance),
    };
}