const video = document.getElementById("video");
const playBtn = document.getElementById("play");
const backBtn = document.getElementById("back");
const forwardBtn = document.getElementById("forward");
const progressRange = document.getElementById("progressRange");
const time = document.getElementById("time");
const muteBtn = document.getElementById("mute");
const volume = document.getElementById("volume");
const speedRange = document.getElementById("speedRange");
const speedLabel = document.getElementById("speedLabel");
const speedUp = document.getElementById("speedUp");
const speedDown = document.getElementById("speedDown");

const formatTime = (s) => {
  if (isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${sec}`;
};

const updateTime = () => {
  time.textContent = `${formatTime(video.currentTime)} / ${formatTime(
    video.duration
  )}`;
  if (video.duration) {
    progressRange.value = (video.currentTime / video.duration) * 100;
  }
};

const updateSpeed = (val) => {
  video.playbackRate = val;
  speedRange.value = val;
  speedLabel.textContent = val + "x";
};

playBtn.addEventListener("click", () =>
  video.paused ? video.play() : video.pause()
);

video.addEventListener("play", () => (playBtn.textContent = "Pause"));
video.addEventListener("pause", () => (playBtn.textContent = "Play"));
backBtn.addEventListener("click", () => (video.currentTime -= 5));
forwardBtn.addEventListener("click", () => (video.currentTime += 5));

progressRange.addEventListener("input", () => {
  if (video.duration) {
    video.currentTime = (progressRange.value / 100) * video.duration;
  }
});

muteBtn.addEventListener("click", () => (video.muted = !video.muted));
volume.addEventListener("input", () => (video.volume = volume.value));

speedRange.addEventListener("input", () =>
  updateSpeed(parseFloat(speedRange.value))
);

speedUp.addEventListener("click", () => {
  let newSpeed = Math.min(16, parseFloat(video.playbackRate) + 0.5);
  updateSpeed(newSpeed);
});

speedDown.addEventListener("click", () => {
  let newSpeed = Math.max(0, parseFloat(video.playbackRate) - 0.5);
  updateSpeed(newSpeed);
});

video.addEventListener("timeupdate", updateTime);
video.addEventListener("loadedmetadata", updateTime);
updateSpeed(1);
