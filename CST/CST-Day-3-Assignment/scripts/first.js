let message;

message = prompt("Please enter your message:", "");

document.write("<h1>Heading</h1><hr>");

for (let i = 0; i < 6; i++) {
	document.write(`<h${i + 1}>${message} ${i + 1} </h${i + 1}>`);
}
