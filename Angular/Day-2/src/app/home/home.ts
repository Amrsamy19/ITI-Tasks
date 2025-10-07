import { Component, Input } from '@angular/core';
import { IStudent } from '../../interfaces/student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  @Input() data: IStudent[] = [];
}
