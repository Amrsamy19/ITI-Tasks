const canvas = document.querySelector("canvas");
canvas.width = 300;
canvas.height = 300;
const ctx = canvas.getContext("2d");

let gradient = ctx.createRadialGradient(150, 150, 30, 200, 200, 250);

gradient.addColorStop(0, "#66a3ff");
gradient.addColorStop(1, "#0040ff");

ctx.beginPath();
ctx.arc(150, 150, 140, 0, Math.PI * 2);
ctx.fillStyle = gradient;
ctx.fill();
ctx.closePath();

let gradient2 = ctx.createRadialGradient(150, 150, 30, 150, 150, 100);
gradient2.addColorStop(0, "#66a3ff");
gradient2.addColorStop(1, "#0040ff");

ctx.beginPath();
ctx.arc(150, 150, 120, 0, Math.PI * 2);
ctx.fillStyle = gradient2;
ctx.fill();
ctx.closePath();

ctx.font = "100pt Arial";
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("N", 150, 150);
