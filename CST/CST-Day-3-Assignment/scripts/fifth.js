let start = parseInt(prompt("Enter the start of the range:"));
let end = parseInt(prompt("Enter the end of the range:"));

if (isNaN(start) || isNaN(end)) {
	alert("Error!! Please enter numeric values.");
} else {
	let multiplesOf3 = "";
	let multiplesOf5 = "";
	let sum = 0;

	for (let i = start; i <= end; i++) {
		if (i % 3 === 0) {
			multiplesOf3 += `${i} `;
			sum += i;
		} else if (i % 5 === 0) {
			multiplesOf5 += `${i} `;
			sum += i;
		}
	}

	console.log(`Number of multiples of 3: ${multiplesOf3}`);
	console.log(`Number of multiples of 5: ${multiplesOf5}`);
	console.log(`Total Sum: ${sum}`);
}
