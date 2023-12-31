import * as fs from "fs";

export function solution() {
    let data = fs.readFileSync("2023/data/day7.txt", "utf8");
    parts(data);
}

function parts(fileData) {
    const lines = fileData.split("\n");
    console.log(`Day7: ${part1(lines)} | ${part2(lines)}`)
}

function part1(lines) {
    const hands = parseInput(lines);
    hands.sort((x, y) => compareHands(x.hand, y.hand));
    
    let result = 0;
    for (let i = 0; i < hands.length; i++) {
        result += hands[i].bid * (i+1);
    }
    
    return result;
}

function part2(lines) {
    const hands = parseInput(lines);
    hands.sort((x, y) => compareHandsPart2(x.hand, y.hand));
    
    let result = 0;
    for (let i = 0; i < hands.length; i++) {
        result += hands[i].bid * (i+1);
    }
    
    return result;
}

function parseInput(lines) {
    const hands = [];

    for (let line of lines) {
        let [hand, bid] = line.split(" ");
        hands.push( {hand: hand, bid: Number(bid)} );
    }

    return hands;
}

function getRank(hand) {
    const cards = {};
    for (let card of hand) {
        if (cards[card] === undefined) {cards[card] = 1;}
        else {cards[card] += 1;}
    }

    let amounts = [];
    for (let key in cards) {
        amounts.push(cards[key]);
    }
    amounts.sort();
    amounts = amounts.toString();

    return (
        amounts === "5" ? 7 :
        amounts === "1,4" ? 6 :
        amounts === "2,3" ? 5 :
        amounts === "1,1,3" ? 4 :
        amounts === "1,2,2" ? 3 :
        amounts === "1,1,1,2" ? 2 :
        1
    );
}

function compareHands(hand1, hand2) {
    if (getRank(hand1) === getRank(hand2)) {

        const cardOrder = "AKQJT98765432";
        for (let i = 0; i < 5; i++) {
            if (cardOrder.indexOf(hand1[i]) > cardOrder.indexOf(hand2[i])) {return -1;}
            else if (cardOrder.indexOf(hand1[i]) < cardOrder.indexOf(hand2[i])) {return 1;}
        }

        return 0;
    }

    return getRank(hand1) < getRank(hand2) ? -1 : 1;
}

function getRankPart2(hand) {
    const cards = {};
    let jokers = 0;
    for (let card of hand) {
        if (card === "J") {jokers += 1; continue;}
        if (cards[card] === undefined) {cards[card] = 1;}
        else {cards[card] += 1;}
    }

    let amounts = [];
    for (let key in cards) {
        amounts.push(cards[key]);
    }
    amounts.sort();
    if (amounts.length === 0) {amounts.push(5)}
    else {amounts[amounts.length-1] += jokers;}
    amounts = amounts.toString();

    return (
        amounts === "5" ? 7 :
        amounts === "1,4" ? 6 :
        amounts === "2,3" ? 5 :
        amounts === "1,1,3" ? 4 :
        amounts === "1,2,2" ? 3 :
        amounts === "1,1,1,2" ? 2 :
        1
    );
}

function compareHandsPart2(hand1, hand2) {
    if (getRankPart2(hand1) === getRankPart2(hand2)) {

        const cardOrder = "AKQT98765432J";
        for (let i = 0; i < 5; i++) {
            if (cardOrder.indexOf(hand1[i]) > cardOrder.indexOf(hand2[i])) {return -1;}
            else if (cardOrder.indexOf(hand1[i]) < cardOrder.indexOf(hand2[i])) {return 1;}
        }

        return 0;
    }

    return getRankPart2(hand1) < getRankPart2(hand2) ? -1 : 1;
}