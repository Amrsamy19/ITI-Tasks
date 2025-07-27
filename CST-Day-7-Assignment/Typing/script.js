//Task 3
function openMessageChild() {
  childWindow = window.open(
    "message.html",
    "",
    "width=300,height=300,top=0,left=300"
  );

  const str =
    "Hello, this is a typing message. It will appear one character at a time. And it will close automatically after two seconds.";

  // let stringArray = str.split("");
  let index = 0;

  let messageTimer = setInterval(function () {
    childWindow.document.write(str[index++]);
    if (index === str.length) {
      let time = new Date().getTime();
      while (new Date().getTime() - time < 2000) {
        // Wait for 2 seconds
      }
      childWindow.close();
      index = 0;
      clearInterval(messageTimer);
    }
  }, 30);
}
