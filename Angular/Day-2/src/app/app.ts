import { Component, signal } from '@angular/core';
import { Writer } from '../writer/writer';
import { Slideshow } from '../slideshow/slideshow';

@Component({
  selector: 'app-root',
  imports: [Writer, Slideshow],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Day-2');
}
