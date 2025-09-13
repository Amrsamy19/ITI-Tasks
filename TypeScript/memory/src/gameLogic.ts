import { memoryImagesPaths, shuffleImages } from "./gameData.js";
import { flippedCards, matchedCards, resetState } from "./gameState.js";

export function flipCard(index: number, images: string[]) {
  if (matchedCards.has(index)) return; // already matched
  if (flippedCards.includes(index)) return; // already flipped
  if (flippedCards.length === 2) return; // wait until reset

  const card = document.getElementById(
    "card" + index
  ) as HTMLImageElement | null;

  if (!card) return;

  card.src = images[index];
  flippedCards.push(index);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const [first, second]: number[] = flippedCards;
  if (memoryImagesPaths[first] === memoryImagesPaths[second]) {
    matchedCards.add(first);
    matchedCards.add(second);

    if (matchedCards.size === memoryImagesPaths.length) {
      alert("Congratulations! You matched all pairs!");
      resetGame();
    }
  } else {
    const firstCard = document.getElementById(
      "card" + first
    ) as HTMLImageElement | null;
    const secondCard = document.getElementById(
      "card" + second
    ) as HTMLImageElement | null;

    if (firstCard) firstCard.src = "assets/Moon.gif";
    if (secondCard) secondCard.src = "assets/Moon.gif";
  }
  flippedCards.length = 0; // reset flippedCards
}

export function resetGame() {
  resetState();
  shuffleImages(memoryImagesPaths);

  for (let i = 0; i < memoryImagesPaths.length; i++) {
    const card = document.getElementById("card" + i) as HTMLImageElement | null;
    if (card) card.src = "assets/Moon.gif";
  }
}
