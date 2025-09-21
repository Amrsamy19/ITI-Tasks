let start = parseInt(prompt("Enter the start of the range:"));
let end = parseInt(prompt("Enter the end of the range:"));
let type = prompt("Please type of the values:");
let result = "";
let sum = 0;

if (start > end) {
	let temp = start;
	start = end;
	end = temp;
}

for (let i = start; i <= end; i++) {
	if (type === "odd") {
		if (i % 2 !== 0) {
			result += `${i} `;
			sum += i;
		}
	} else if (type === "even") {
		if (i % 2 === 0) {
			result += `${i} `;
			sum += i;
		}
	} else if (type === "no") {
		result += `${i} `;
		sum += i;
	}
}

console.log(`The Numbers: ${result}`);
console.log(`Total Sum: ${sum}`);
