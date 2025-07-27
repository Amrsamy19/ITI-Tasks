//1.4 Fourth Task
let username, phoneNumber, mobileNumber, email, color;

function checkName(username) {
	let nameRegex = /^[A-Za-z]+$/;
	return nameRegex.test(username);
}

function checkPhone(phoneNumber) {
	let phoneRegex = /^\d{8}$/;
	return phoneRegex.test(phoneNumber);
}

function checkMobile(mobileNumber) {
	let mobileRegex = /^(010|011|012)\d{8}$/;
	return mobileRegex.test(mobileNumber);
}

function checkEmail(email) {
	let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function checkColor(email) {
	let colorRegex = /^(red|green|blue)$/i;
	return colorRegex.test(color);
}

do {
	username = prompt("Please enter your name:");
} while (!checkName(username));

do {
	phoneNumber = prompt("Please enter your phone number:");
} while (!checkPhone(phoneNumber));

do {
	mobileNumber = prompt(
		"Please enter your mobile number: (where it should start with 010 || 012 || 011 || 015)"
	);
} while (!checkMobile(mobileNumber));

do {
	email = prompt("Please enter your email:");
} while (!checkEmail(email));

do {
	color = prompt("Please choose one: (red, green, or blue)");
} while (!checkColor(color));

// document.body.style.color = color;
document.write(
	`<h1 style="color:${color}">Name: ${username}</h1>
		<h2 style="color:${color}">Phone Number: ${phoneNumber}</h2>
		<h2 style="color:${color}">Mobile Number: ${mobileNumber}</h2>
		<h2 style="color:${color}">Email: ${email}</h2>
		<h2 style="color:${color}">Color: ${color}</h2>`
);

console.log(
	`%c Name: ${username} || Phone Number: ${phoneNumber} || Mobile Number: ${mobileNumber} || Email: ${email}`,
	`color:${color}`
);
