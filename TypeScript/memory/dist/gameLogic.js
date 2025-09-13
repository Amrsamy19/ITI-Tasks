import { memoryImagesPaths, shuffleImages } from "./gameData.js";
import { flippedCards, matchedCards, resetState } from "./gameState.js";
import { playSound } from "./utils.js";
export function flipCard(index, images) {
    if (matchedCards.has(index))
        return; // already matched
    if (flippedCards.includes(index))
        return; // already flipped
    if (flippedCards.length === 2)
        return; // wait until reset
    const card = document.getElementById("card" + index);
    if (!card)
        return;
    card.src = images[index];
    flippedCards.push(index);
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}
function checkMatch() {
    const [first, second] = flippedCards;
    if (memoryImagesPaths[first] === memoryImagesPaths[second]) {
        matchedCards.add(first);
        matchedCards.add(second);
        playSound("assets/yippee.mp3");
        if (matchedCards.size === memoryImagesPaths.length) {
            alert("Congratulations! You matched all pairs!");
            resetGame();
        }
    }
    else {
        // prevent clicking during playing the sound and flipping back
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => (card.style.pointerEvents = "none"));
        setTimeout(() => {
            cards.forEach((card) => (card.style.pointerEvents = "auto"));
            const firstCard = document.getElementById("card" + first);
            const secondCard = document.getElementById("card" + second);
            if (firstCard)
                firstCard.src = "assets/Moon.gif";
            if (secondCard)
                secondCard.src = "assets/Moon.gif";
        }, 1000);
    }
    flippedCards.length = 0; // reset flippedCards
}
export function resetGame() {
    resetState();
    shuffleImages(memoryImagesPaths);
    for (let i = 0; i < memoryImagesPaths.length; i++) {
        const card = document.getElementById("card" + i);
        if (card)
            card.src = "assets/Moon.gif";
    }
}
