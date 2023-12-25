import * as fs from "fs";

export function solution() {
    let data = fs.readFileSync("2023/data/day5.txt", "utf8");
    parts(data);
}

function parts(fileData) {
    const lines = fileData.split("\n");
    console.log(`Day5: ${part1(lines)} | ${part2(lines)}`)
}

function part1(lines) {
    const seeds = parseSeeds(lines[0]);
    const maps = parseMaps(lines);

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
    const seedRanges = parseSeedRanges(lines[0]);
    const maps = parseMaps(lines);

    sortSeedRanges(seedRanges);
    sortMaps(maps);

    maps.reverse();

    for (let i = 0; i < 100000000; i++) {
        let currentValue = i;
        for (let mapGroup of maps) {
            for (let map of mapGroup) {
                if (currentValue >= map.destination && currentValue < map.destination + map.amount) {
                    currentValue = map.source + currentValue - map.destination;
                    break;
                }
            }
        }

        for (let seedRange of seedRanges) {
            if (currentValue >= seedRange.start && currentValue < seedRange.start + seedRange.amount) {return i;}
        }
    }

    return 0;
}

function sortSeedRanges(seedRanges) {
    seedRanges.sort((x, y) => x.start < y.start ? -1 : x.start > y.start ? 1 : 0);
}

function sortMaps(maps) {
    for (let map of maps) {
        map.sort((x, y) => x.source < y.source ? -1 : x.source > y.source ? 1 : 0);
    }
}

function parseSeeds(line) {
    return line.split(": ")[1].split(" ").map(Number);
}

function parseSeedRanges(line) {
    line = line.split(": ")[1].split(" ");

    const seedRanges = [];
    for (let i = 0; i < line.length; i+=2) {
        seedRanges.push( {
            start: Number(line[i]),
            amount: Number(line[i+1]),
        } )
    }

    return seedRanges;
}

function parseMaps(lines) {
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

    return maps
}