import { Card } from "./Card.js";
import { memoryImagesPaths, shuffleImages } from "./gameData.js";
import { flipCard } from "./gameLogic.js";
import { playSound } from "./utils.js";

// Initialize game
window.onload = function () {
  const board = document.getElementById("gameBoard") as HTMLDivElement | null;

  shuffleImages(memoryImagesPaths);
  playSound(Math.random() < 0.5 ? "assets/start.mp3" : "assets/start_2.mp3");

  if (board) {
    board.innerHTML = "";
    for (let i = 0; i < memoryImagesPaths.length; i++) {
      const img = Card(i);
      img.addEventListener("click", () => flipCard(i, memoryImagesPaths));
      board.appendChild(img);
    }
  }
};
