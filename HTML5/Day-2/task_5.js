const canvas = document.querySelector("canvas");
canvas.style.border = "3px solid black";
const ctx = canvas.getContext("2d");
const img = document.getElementById("meme");

img.addEventListener("load", () => {
  ctx.drawImage(img, 10, 10, canvas.width - 20, canvas.height - 20);
  ctx.shadowColor = "rgba(255, 255, 255, 1)";
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;

  ctx.font = "60px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  ctx.fillText("كانت حصة رسم", 20, 550);
  ctx.strokeStyle = "black";
});
