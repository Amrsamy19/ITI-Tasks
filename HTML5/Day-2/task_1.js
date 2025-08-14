const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.style.border = "1px solid black";

let flipCounter = 0;
const interval = setInterval(() => {
  //change the counter clockwise for the next arc
  if (flipCounter === 10) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, Math.PI * 2, flipCounter % 2 === 0);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    clearInterval(interval);
    return;
  }
  if (flipCounter !== 10) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, Math.PI, flipCounter % 2 === 0);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    flipCounter++;
  }
  console.log(flipCounter);
}, 500);
