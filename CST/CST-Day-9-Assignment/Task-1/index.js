document.getElementById("submit").addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.querySelector(
    "input" + '[name="gender"]:checked'
  ).value;
  const color = document.getElementById("color").value;

  const allCookieList = cookieManager.allCookieList();

  try {
    if (allCookieList.find((cookie) => cookie.name === `${name}${age}`)) {
      cookieManager.setCookie("signedId", `${name}${age}`, 2);
      cookieManager.setCookie("color", color);
      window.location.href =
        "http://127.0.0.1:5500/CST-Day-9-Assignment/Task-1/welcome.html";
    } else {
      cookieManager.setCookie("signedId", `${name}${age}`, 2);
      cookieManager.setCookie("name", name, 2);
      cookieManager.setCookie("age", age, 2);
      cookieManager.setCookie("gender", gender);
      cookieManager.setCookie("color", color);
      cookieManager.setCookie(`${name}${age}`, 1);
      window.location.href =
        "http://127.0.0.1:5500/CST-Day-9-Assignment/Task-1/welcome.html";
    }
  } catch (error) {
    alert(error.message);
  }
});

//First Task

// let userInteracted = false;

// // Listen to user input in input and textarea
// function markAsInteracted() {
//   userInteracted = true;
// }

// document.querySelectorAll("input, select").forEach((el) => {
//   el.addEventListener("input", markAsInteracted);
// });

// // Fire custom event after 30 seconds of inactivity
// setInterval(() => {
//   if (!userInteracted) {
//     const event = new CustomEvent("customEvent");
//     window.dispatchEvent(event);
//   }
// }, 5000);

// // Handle the custom event
// window.addEventListener("customEvent", () => {
//   alert("No input entered for 5 seconds, Are you a human?");
//   console.log("No user input detected.");
// });
