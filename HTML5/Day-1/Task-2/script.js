const setColor = () => {
  const red = document.getElementById("red").value;
  const green = document.getElementById("green").value;
  const blue = document.getElementById("blue").value;
  const alpha = document.getElementById("alpha").value;
  document.getElementById(
    "color"
  ).style.color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

document.getElementById("red").addEventListener("input", setColor);
document.getElementById("green").addEventListener("input", setColor);
document.getElementById("blue").addEventListener("input", setColor);
document.getElementById("alpha").addEventListener("input", setColor);
