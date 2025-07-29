//TODO: Receive the cookie and check if there is a cookie with the name "id", or not

const name = cookieManager.getCookie("name");
const gender = cookieManager.getCookie("gender");
const color = cookieManager.getCookie("color");
let visits = parseInt(cookieManager.getCookie("visits") || "0");

const imgSrc =
  gender.toLowerCase() === "male" ? "images/1.jpg" : "images/2.jpg";

const html = `
  <h2>Hello, <strong style="color:${color}">${name}</strong>!</h2>
  <img src="${imgSrc}" alt="${gender}" width="100"/>
  <p>Number of visits: <strong style="color:${color}">${visits}</strong></p>
  `;

document.getElementById("profile").innerHTML = html;
visits++;
cookieManager.setCookie("visits", visits, 365);

// if (
//   cookieManager.hasCookie("userName") ||
//   cookieManager.hasCookie("gender") ||
//   cookieManager.hasCookie("color")
// ) {
//   showProfile();
// } else {
//   window.location.href =
//     "http://127.0.0.1:5500/CST-Day-9-Assignment/index.html";
//   register();
// }
