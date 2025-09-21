const mainContainer = document.getElementById("container");
const mainContainerCoords = mainContainer.getBoundingClientRect();

const firstChild = document.getElementById("firstImage");
const secondChild = document.getElementById("secondImage");
const thirdChild = document.getElementById("thirdImage");

let direction = 1; // 1 for right, -1 for left
let step = 13; // pixels to move each time
let movingState = false;
let interval;

const stop = () => {
  clearInterval(interval);
  movingState = false;
  document.getElementById("start").innerText = "Start";
};

document.getElementById("start").addEventListener("click", () => {
  // If `movingState` is true, then images are currently in motion (moving).
  if (movingState) {
    stop();
    return;
  }
  document.getElementById("start").innerText = "Stop";
  movingState = true;
  interval = setInterval(() => {
    const firstCoords = firstChild.getBoundingClientRect();
    const secondCoords = secondChild.getBoundingClientRect();
    const thirdCoords = thirdChild.getBoundingClientRect();
    // Move first image left and second image right
    if (
      firstCoords.left <= mainContainerCoords.left ||
      firstCoords.right >= mainContainerCoords.right
    ) {
      direction *= -1; // Change direction
    }
    firstChild.style.left = `${firstCoords.left + step * direction}px`;
    secondChild.style.left = `${secondCoords.left - step * direction}px`;

    // Move third image from bottom to top
    if (thirdCoords.top <= mainContainerCoords.top) {
      thirdChild.style.top = `${firstCoords.top + step * direction}px`;
    } else {
      thirdChild.style.top = `${thirdCoords.top - step * direction}px`;
    }

    document.getElementById("positions").innerText =
      `FirstImage: (Left: ${parseInt(firstChild.style.left)}, Right: ${
        mainContainerCoords.width - firstCoords.width - firstCoords.left
      })\n` +
      `SecondImage: (Left: ${parseInt(secondChild.style.left)}, Right: ${
        mainContainerCoords.width - secondCoords.width - secondCoords.left
      })\n` +
      `ThirdImage: (Bottom: ${
        mainContainerCoords.height - thirdCoords.height - thirdCoords.top
      }, Top: ${parseInt(thirdChild.style.top)})`;
  }, 50);
});

/* 
The function is an event listener that listens for a click event on the element with the id "reset".
When the reset button is clicked, the function inside the event listener is executed.
*/
document.getElementById("reset").addEventListener("click", () => {
  clearInterval(interval);
  firstChild.style.top = "295px";
  firstChild.style.left = "13px";

  secondChild.style.left = "563px";
  secondChild.style.top = "295px";

  thirdChild.style.left = "285px";
  thirdChild.style.top = "580px";
  movingState = false;
  document.getElementById("start").innerText = "Start";
  document.getElementById("positions").innerText =
    `FirstImage: (Left: ${parseInt(firstChild.style.left)}, Right: ${
      mainContainerCoords.width -
      firstChild.getBoundingClientRect().width -
      firstChild.getBoundingClientRect().left
    })\n` +
    `SecondImage: (Left: ${parseInt(secondChild.style.left)}, Right: ${
      mainContainerCoords.width -
      secondChild.getBoundingClientRect().width -
      secondChild.getBoundingClientRect().left
    })\n` +
    `ThirdImage: (Bottom: ${
      mainContainerCoords.height -
      thirdChild.getBoundingClientRect().height -
      thirdChild.getBoundingClientRect().top
    }, Top: ${parseInt(thirdChild.style.top)})`;
});
