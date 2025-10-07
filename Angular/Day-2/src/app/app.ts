import { Component, Output } from '@angular/core';
import { Writer } from '../writer/writer';
import { Slideshow } from '../slideshow/slideshow';
import { Login } from './login/login';
import { Home } from './home/home';
import { IStudent } from '../interfaces/student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Writer, Slideshow, Login, Home, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  @Output() studentsData: IStudent[] = [];

  reciever(data: IStudent) {
    this.studentsData.push(data);
  }
}
