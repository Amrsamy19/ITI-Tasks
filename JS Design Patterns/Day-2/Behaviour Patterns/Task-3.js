let text = "";
const history = [];

function add(content) {
  return {
    execute: () => {
      text += content;
    },
    undo: () => {
      text = text.slice(0, -content.length);
    },
  };
}

function exec(command) {
  command.execute();
  history.push(command);
}

function undo() {
  const command = history.pop();
  if (command) command.undo();
}

exec(add("Hello "));
exec(add("World"));
console.log(text);

undo();
console.log(text);

undo();
console.log(text);
