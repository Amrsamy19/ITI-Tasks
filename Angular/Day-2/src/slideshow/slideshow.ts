import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slideshow',
  imports: [FormsModule],
  templateUrl: './slideshow.html',
  styleUrls: ['./slideshow.css'],
})
export class Slideshow {
  imageSources: string[] = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
  currentImageIndex: number = 0;
  private intervalId: any;

  next() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.imageSources.length;
  }

  previous() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.imageSources.length) % this.imageSources.length;
  }

  startSlideshow() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.next();
    }, 1000);
  }

  stopSlideshow() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
