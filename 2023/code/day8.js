import * as fs from "fs";

export function solution() {
    fs.readFile("2023/data/day8.txt", "utf8", (err, data) => {
        if (err) throw err;
        parts(data);
    });
}

function parts(fileData) {
    const lines = fileData.split("\n");
    console.log(`Day8: ${part1(lines)} | ${part2(lines)}`)
}

function part1(lines) {
    const [instructions, nodes] = parseInput(lines);

    let currentNode = "AAA";
    let count = 0;

    while (true) {
        for (let char of instructions) {
            currentNode = nodes[currentNode][Number(char === "R")];

            count++;
            if (currentNode === "ZZZ") {return count;}
        }
    }
}

function part2(lines) {
    const [instructions, nodes] = parseInput(lines);

    const currentNodes = getStartingNodes(nodes);
    let count = 0;

    let occurances = [];
    for (let _ of currentNodes) {
        occurances.push([]);
    }

    while (true) {
        for (let char of instructions) {
            count++;

            for (let i = 0; i < currentNodes.length; i++) {
                currentNodes[i] = nodes[currentNodes[i]][Number(char === "R")];
                if (currentNodes[i].endsWith("Z")) {occurances[i].push(count);}
            }

            if (count > 100000) {
                let cycles = [];
                for (let i = 0; i < currentNodes.length; i++) {
                    cycles.push(occurances[i][1] - occurances[i][0]);
                }
                return cycles.reduce(lowestCommonMultiple, 1);
            }

            if (areEndingNodes(currentNodes)) {return count;}
        }
    }
}

function lowestCommonMultiple(left, right) {
    let first = left;
    let second = right;

    while (first !== second) {
        if (first < second) {
            first +=left;
        } else {
            second += right;
        }
    }

    return first;
}

function parseInput(lines) {
    let instructions = lines[0];

    const nodes = {};
    for (let line of lines.slice(2)) {
        let [node, dir] = line.split(" = ");
        let [left, right] = dir.slice(1, dir.length-1).split(", ");
        
        nodes[node] = [left, right];
    }

    return [instructions, nodes];
}

function getStartingNodes(nodes) {
    const startingNodes = [];

    for (let node in nodes) {
        if (node.endsWith("A")) {
            startingNodes.push(node);
        }
    }

    return startingNodes;
}

function areEndingNodes(nodes) {
    for (let node of nodes) {
        if (!node.endsWith("Z")) {
            return false;
        }
    }

    return true;
}