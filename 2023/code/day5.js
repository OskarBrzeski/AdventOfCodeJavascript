import * as fs from "fs";

export function solution() {
    fs.readFile("2023/data/day5.txt", "utf8", (err, data) => {
        if (err) throw err;
        parts(data);
    });
}

function parts(fileData) {
    const lines = fileData.split("\n");
    console.log(`Day5: ${part1(lines)} | ${part2(lines)}`)
}

function part1(lines) {
    const [seeds, maps] = parseFile(lines);

    let lowest = Infinity;

    for (let seed of seeds) {
        let currentValue = seed;
        for (let mapGroup of maps) {
            for (let map of mapGroup) {
                if (currentValue >= map.source && currentValue < map.source + map.amount) {
                    currentValue = map.destination + currentValue - map.source;
                    break;
                }
            }
        }

        if (currentValue < lowest) {lowest = currentValue;}
    }
    
    return lowest;
}

function part2(lines) {
    return 0;
}

function parseFile(lines) {
    const seeds = lines[0].split(": ")[1].split(" ").map(Number);
    
    const maps = [];
    for (let line of lines.slice(1)) {
        if (line === "") {maps.push([]); continue;}
        if (line[line.length-1] === ":") {continue;}
        
        let [destination, source, amount] = line.split(" ").map(Number);
        maps[maps.length-1].push( {
            destination: destination,
            source: source,
            amount: amount,
        } );
    }

    return [seeds, maps]
}