const canvas = document.querySelector("canvas");
canvas.width = 300;
canvas.height = 300;
canvas.style.border = "1px solid black";
const ctx = canvas.getContext("2d");

let lastPosition = { x: 0, y: 0 };

const interval = setInterval(() => {
  if (lastPosition.x <= canvas.width || lastPosition.y <= canvas.height) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(lastPosition.x, lastPosition.y);
    ctx.stroke();
    ctx.closePath();

    lastPosition.x += 100;
    lastPosition.y += 100;
  } else {
    alert("You have reached the end of the canvas!");
    clearInterval(interval); // Stop the interval after reaching the end
    return;
  }

  console.log(`Current Position: (${lastPosition.x}, ${lastPosition.y})`);
}, 1000);
