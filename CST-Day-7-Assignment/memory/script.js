const images = [
  "imgs/1.gif",
  "imgs/1.gif",
  "imgs/2.gif",
  "imgs/2.gif",
  "imgs/3.gif",
  "imgs/3.gif",
  "imgs/4.gif",
  "imgs/4.gif",
  "imgs/5.gif",
  "imgs/5.gif",
  "imgs/6.gif",
  "imgs/6.gif",
];

// Shuffle the images array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(images);

// Game state
let flippedCards = [];
let matchedCards = new Set();

function flipCard(index) {
  if (matchedCards.has(index)) return; // already matched
  if (flippedCards.includes(index)) return; // already flipped this turn
  if (flippedCards.length === 2) return; // wait until cards reset

  const card = document.getElementById("card" + index);
  card.src = images[index];
  flippedCards.push(index);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const [first, second] = flippedCards;
  if (images[first] === images[second]) {
    matchedCards.add(first);
    matchedCards.add(second);
    if (matchedCards.size === images.length) {
      alert("Congratulations! You matched all pairs!");
      resetGame();
    }
  } else {
    // Not a match: flip back over
    document.getElementById("card" + first).src = "imgs/Moon.gif";
    document.getElementById("card" + second).src = "imgs/Moon.gif";
  }
  flippedCards = [];
}

function resetGame() {
  // Reset matched cards
  matchedCards.clear();
  flippedCards = [];
  shuffle(images);
  // Reset all cards back to moon.gif
  for (let i = 0; i < images.length; i++) {
    document.getElementById("card" + i).src = "imgs/Moon.gif";
  }
}
