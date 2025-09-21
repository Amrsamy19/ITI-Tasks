document.getElementById("div1").addEventListener("contextmenu", () => {
  event.preventDefault();
});

document.forms[0].addEventListener("submit", () => {
  let choice = confirm("Would you like to submit the data?");

  if (!choice) {
    event.preventDefault();
  }
});
