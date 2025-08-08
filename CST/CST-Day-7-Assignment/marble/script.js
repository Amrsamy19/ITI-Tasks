const marbles = document.querySelectorAll(".marble");
const grayMarble = "./marbels/marble1.jpg";
const orangeMarble = "./marbels/marble3.jpg";
let current = 0;
let speed = 1000;
let interval = null;

function showActiveMarble() {
  for (let index = 0; index < marbles.length; index++) {
    marbles[index].src = grayMarble;
  }
  marbles[current].src = orangeMarble;
}

function startAnimation() {
  clearInterval(interval);
  interval = setInterval(() => {
    showActiveMarble();
    current = (current + 1) % marbles.length;

    if (current === 0 && speed > 300) {
      speed -= 100;
      updateSpeed();
    }
  }, speed);
}

function stopAnimation() {
  clearInterval(interval);
}

function updateSpeed() {
  document.getElementById("info").textContent = `Speed: ${speed}ms`;
  startAnimation(); // restart with new speed
}

// Initialize
showActiveMarble();
startAnimation();
