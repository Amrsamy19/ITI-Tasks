document.getElementById("submit").addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.querySelector(
    "input" + '[name="gender"]:checked'
  ).value;
  const color = document.getElementById("color").value;
  const id = Math.random();

  console.log("Name:", name);
  console.log("Age:", age);
  console.log("Gender:", gender);
  console.log("Color:", color);

  try {
    cookieManager.setCookie("id", id, 2);
    cookieManager.setCookie("name", name);
    cookieManager.setCookie("age", age);
    cookieManager.setCookie("gender", gender);
    cookieManager.setCookie("color", color);
    cookieManager.setCookie("visits", 1);
    alert("Cookies set successfully!");
    window.location.href =
      "http://127.0.0.1:5500/CST-Day-9-Assignment/welcome.html";
  } catch (error) {
    alert(error.message);
  }
});

//First Task

// let userInteracted = false;

// Listen to user input in input and textarea
// function markAsInteracted() {
//   userInteracted = true;
// }

// document.querySelectorAll("input, select").forEach((el) => {
//   el.addEventListener("input", markAsInteracted);
// });

// Fire custom event after 30 seconds of inactivity
// setInterval(() => {
//   if (!userInteracted) {
//     const event = new CustomEvent("customEvent");
//     window.dispatchEvent(event);
//   }
// }, 5000);

// Handle the custom event
// window.addEventListener("customEvent", () => {
//   alert("No input entered for 5 seconds!");
//   console.log("No user input detected.");
// });
