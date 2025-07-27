let firstNumber = parseInt(prompt("Please enter the first number", ""));
let secondNumber = parseInt(prompt("Please enter the second number", ""));
let thirdNumber = parseInt(prompt("Please enter the third number", ""));

if (firstNumber % secondNumber === 0 && firstNumber % thirdNumber === 0) {
	alert(
		`${firstNumber} is divisible by both ${secondNumber} and ${thirdNumber}.`
	);
} else if (
	firstNumber % secondNumber === 0 &&
	firstNumber % thirdNumber === 1
) {
	alert(`${firstNumber} is divisible by only ${secondNumber}.`);
} else if (
	firstNumber % secondNumber !== 0 &&
	firstNumber % thirdNumber === 0
) {
	alert(`${firstNumber} is divisible by only ${thirdNumber}.`);
} else {
	alert(
		`${firstNumber} is not divisible by either ${secondNumber} or ${thirdNumber}.`
	);
}
