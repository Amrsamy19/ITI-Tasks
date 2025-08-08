//1.3 Third Task
function longestWord(message) {
	let wordsArray = message.split(" ");

	let longestWord = "";
	let longestLength = 0;

	for (let index = 0; index < wordsArray.length; index++) {
		if (wordsArray[index].length > longestLength) {
			longestLength = wordsArray[index].length;
			longestWord = wordsArray[index];
		}
	}

	return longestWord;
}

let message = prompt("Please enter your message: ");

console.log(longestWord(message));
