let number,
	sum = 0;

let state = true;

while (state) {
	number = parseInt(prompt("Please enter a number:", ""));

	if (number === 0) {
		state = false;
	}

	if (sum > 100) {
		state = false;
	}

	if (isNaN(number)) {
		alert("Please enter a number");
		state = false;
	}

	sum += number;
}

console.log(`The total sum is ${sum}`);
