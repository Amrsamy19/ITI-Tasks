document.getElementById("copyImage").addEventListener("click", function () {
  event.preventDefault();
  const mainImageContainer = document.getElementById("header");
  const mainImage = mainImageContainer.firstElementChild;
  const copiedImage = mainImage.cloneNode(true);
  const copiedImageContainer = document.createElement("div");
  copiedImageContainer.style.textAlign = "left";
  copiedImageContainer.appendChild(copiedImage);
  mainImageContainer.style.textAlign = "right";
  document.getElementById("nav").style.listStyleType = "circle";
  document.body.appendChild(copiedImageContainer);
});
