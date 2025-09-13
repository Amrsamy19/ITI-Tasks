import { playSound } from "./utils.js";
export let flippedCards = [];
export let matchedCards = new Set();
export function resetState() {
    flippedCards = [];
    matchedCards.clear();
    playSound("assets/start.mp3");
}
