import { playSound } from "./utils.js";

export let flippedCards: number[] = [];
export let matchedCards: Set<number> = new Set();

export function resetState() {
  flippedCards = [];
  matchedCards.clear();
  playSound("assets/start.mp3");
}
