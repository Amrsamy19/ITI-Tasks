//Wait 5 seconds
function wait5Sec() {
  console.log("Waiting for 5 seconds...");
  let time = new Date().getTime();
  while (new Date().getTime() < time + 5000) {
    // Busy-wait for 5 seconds
  }
  console.log("5 seconds have passed.");
}

wait5Sec();

//Task 1
let childWindow;

function openFlyingChild() {
  // Reset stop flag
  window.stopChild = false;

  // Open child.html in a new window
  childWindow = window.open(
    "child.html",
    "",
    "width=300,height=200,top=0,left=300"
  );
  childWindow.focus();
}

function stopFlying() {
  window.stopChild = true;
  childWindow.focus();
}

//Task 2
function openScrollableChild() {
  childWindow = window.open(
    "scrollable.html",
    "",
    "width=300,height=300,top=0,left=300"
  );
  let scroller = setInterval(function () {
    if (
      childWindow.scrollY + childWindow.innerHeight <=
      childWindow.document.body.scrollHeight
    ) {
      childWindow.scrollBy(0, 10);
    } else {
      // Stop when bottom is reached
      clearInterval(scroller);
    }
  }, 30);
}

//Task 3
function openMessageChild() {
  childWindow = window.open(
    "message.html",
    "",
    "width=300,height=300,top=0,left=300"
  );

  const str =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  // let stringArray = str.split("");
  let index = 0;

  let messageTimer = setInterval(function () {
    childWindow.document.write(str[index++]);
    if (index === str.length) {
      childWindow.close();
      index = 0;
      clearInterval(messageTimer);
    }
  }, 30);
}
