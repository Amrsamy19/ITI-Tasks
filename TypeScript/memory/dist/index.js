import { Card } from "./Card.js";
import { memoryImagesPaths, shuffleImages } from "./gameData.js";
import { flipCard } from "./gameLogic.js";
import { playSound } from "./utils.js";
// Initialize game
window.onload = function () {
    shuffleImages(memoryImagesPaths);
    const board = document.getElementById("gameBoard");
    playSound("assets/start.mp3");
    if (board) {
        board.innerHTML = "";
        for (let i = 0; i < memoryImagesPaths.length; i++) {
            const img = Card(i);
            img.addEventListener("click", () => flipCard(i, memoryImagesPaths));
            board.appendChild(img);
        }
    }
};
