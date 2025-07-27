//1.1 First Task

let message = prompt("please enter your message: ");
let char = prompt("please enter the character: ");

let ignoreCase = prompt(
	"Would you like to ignore case-sensetive: (Y for ignoring || N for not ignoring)"
);

let isIgnored = ignoreCase.toUpperCase() === "Y" ? true : false;

const charLength = (message, char, isIgnored) => {
	let regex = isIgnored ? new RegExp(char, "gi") : new RegExp(char, "g");

	let matched = message.match(regex);

	return matched ? matched.length : 0;
};

console.log(charLength(message, char, isIgnored));
