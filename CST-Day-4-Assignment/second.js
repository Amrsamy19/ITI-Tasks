//1.2 Second Task
let message = prompt("please enter your message: ");

let ignoreCase = prompt(
	"Would you like to ignore case-sensetive: (Y for ignoring || N for not ignoring)"
);

let isIgnored = ignoreCase.toUpperCase() === "Y" ? true : false;

const isPalindrome = (message) => {
	message = isIgnored ? message.toLowerCase() : message;

	for (let index = 0; index < message.length / 2; index++) {
		if (message[index] !== message[message.length - 1 - index]) {
			return false;
		}
	}

	return true;
};

console.log(isPalindrome(message));
