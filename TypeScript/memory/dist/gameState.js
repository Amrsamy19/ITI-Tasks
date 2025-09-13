export let flippedCards = [];
export let matchedCards = new Set();
export function resetState() {
    flippedCards = [];
    matchedCards.clear();
}
