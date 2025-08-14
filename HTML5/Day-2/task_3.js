const canvas = document.querySelector("canvas");
canvas.style.border = "2px solid black";
const ctx = canvas.getContext("2d");

// Draw 2 rectangles with gradient fill
const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
gradient1.addColorStop(0, "black");
gradient1.addColorStop(0.6, "white");
gradient1.addColorStop(1, "white");

ctx.fillStyle = gradient1;
ctx.fillRect(50, 50, 400, 300);

const gradient2 = ctx.createLinearGradient(250, 250, 250, 450);
gradient2.addColorStop(0, "blue");
gradient2.addColorStop(0.7, "white");
gradient2.addColorStop(0.8, "white");
gradient2.addColorStop(1, "white");

ctx.fillStyle = gradient2;
ctx.fillRect(50, 250, 400, 150);

const gradient3 = ctx.createLinearGradient(0, 0, 0, 600);
gradient3.addColorStop(0, "yellow");
gradient3.addColorStop(0.2, "yellow");
gradient3.addColorStop(0.25, "yellow");
gradient3.addColorStop(0.4, "transparent");
gradient3.addColorStop(0.5, "transparent");
gradient3.addColorStop(0.7, "transparent");
gradient3.addColorStop(0.9, "transparent");
ctx.lineWidth = 10;
ctx.strokeStyle = gradient3;
ctx.strokeRect(150, 120, 200, 150);
