const signedId = cookieManager.getCookie("signedId");
const gender = cookieManager.getCookie("gender");
const color = cookieManager.getCookie("color");
const userName = signedId.match(/([a-zA-Z]+)/)[0];
const imgSrc =
  gender.toLowerCase() === "male" ? "images/1.jpg" : "images/2.jpg";

let visits = parseInt(cookieManager.getCookie(signedId) || 1);

const html = `
  <h2>Hello, <strong style="color:${color}">${userName}</strong>!</h2>
  <img src="${imgSrc}" alt="${gender}" width="100"/>
  <p>Number of visits: <strong style="color:${color}">${visits}</strong></p>
  `;

document.getElementById("profile").innerHTML = html;
visits++;
cookieManager.setCookie(signedId, visits, 365);
