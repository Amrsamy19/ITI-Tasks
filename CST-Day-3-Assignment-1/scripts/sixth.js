let numberOfRows = parseInt(prompt("Please enter number of rows: ", ""));

for (let rows = 0; rows < numberOfRows; rows++) {
	let row = "";
	for (let stars = 0; stars <= rows; stars++) {
		row += "*";
	}
	console.log(row);
}
