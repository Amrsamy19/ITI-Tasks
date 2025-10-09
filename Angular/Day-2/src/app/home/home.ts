import { Component, Input } from '@angular/core';
import { IStudent } from '../../interfaces/student';
import { CommonModule } from '@angular/common';
import { Slideshow } from '../../slideshow/slideshow';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Slideshow],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  @Input() data: IStudent[] = [];
}
