export let flippedCards: number[] = [];
export let matchedCards: Set<number> = new Set();

export function resetState() {
  flippedCards = [];
  matchedCards.clear();
}
