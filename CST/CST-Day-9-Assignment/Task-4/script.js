const images = {
  1: "gws.jpg",
  2: "gws2.jpg",
  3: "gws3.jpg",
  4: "gwsf.jpg",
  5: "gwsf2.jpg",
  6: "gwsf3.jpg",
};

document.getElementById("send").addEventListener("click", function () {
  const selectedPhoto = document.querySelector('input[name="photo"]:checked');
  const message = document.getElementById("message").value;

  if (selectedPhoto && message) {
    const htmlContent = `
      <div>
        <img style="width:20%;" src="images/${
          images[selectedPhoto.value]
        }" alt="Get well soon" />
        <p>${message}</p>
        <button onclick="window.close()">Close</button>
      </div>
    `;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(htmlContent);
    newWindow.focus();
  } else {
    alert("Please select a photo and type a message.");
  }
});
