const query = window.location.search;

function getRawValue(key) {
  const regex = new RegExp(`[?&]${key}=([^&]*)`);
  const match = query.match(regex);
  return match ? manualDecode(match[1].replace(/\+/g, " ")) : null;
}

function manualDecode(str) {
  return str.replace(/%([0-9A-Fa-f]{2})/g, function (match, hex) {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

const name = getRawValue("name");
const title = getRawValue("title");
const email = getRawValue("email");
const gender = getRawValue("gender");
const address = getRawValue("address");
const mobile = getRawValue("mobile");

document.getElementById("greeting").textContent = `Welcome, ${title} ${name}!`;

document.getElementById("info").innerHTML = `
      <strong>Email:</strong> ${email}<br>
      <strong>Mobile:</strong> ${mobile}<br>
      <strong>Gender:</strong> ${gender}<br>
      <strong>Address:</strong> ${address}
    `;

const isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (!isChrome) {
  document.getElementById("browserNotice").textContent =
    "For the best experience, we recommend using Google Chrome.";
} else {
  document.getElementById("browserNotice").style.display = "none";
}
