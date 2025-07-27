const images = [
  "./SlideShow/1.jpg",
  "./SlideShow/2.jpg",
  "./SlideShow/3.jpg",
  "./SlideShow/4.jpg",
  "./SlideShow/5.jpg",
  "./SlideShow/6.jpg",
];

let index = 0;
let slideshowInterval = null;

function showImage(idx) {
  const img = document.getElementById("photo");
  img.src = images[idx];
}

function showNext() {
  if (index >= images.length - 1) {
    clearInterval(slideshowInterval);
  } else {
    index = (index + 1) % images.length;
    showImage(index);
  }
}

function showPrevious() {
  if (index <= 0) {
    clearInterval(slideshowInterval);
  } else {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  }
}

function toggleSlideshow() {
  const btn = document.getElementById("slideshowBtn");
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    btn.textContent = "Start Slideshow";
  } else {
    slideshowInterval = setInterval(showNext, 2000);
    btn.textContent = "Stop Slideshow";
  }
}
