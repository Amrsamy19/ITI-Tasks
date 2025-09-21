let firstNumber = parseInt(prompt("Please enter the first number", ""));
let secondNumber = parseInt(prompt("Please enter the second number", ""));

alert(
	`The Maximum number you entered is ${
		firstNumber > secondNumber ? firstNumber : secondNumber
	}`
);
