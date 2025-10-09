import { Component, Output } from '@angular/core';
import { IStudent } from '../interfaces/student';
import { CommonModule } from '@angular/common';
import { IProduct } from '../interfaces/product';
import { NavigationComponent } from './navigation/navigation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NavigationComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // @Output() studentsData: IStudent[] = [];
  // @Output() productData: IProduct = {
  //   name: '',
  //   description: '',
  //   image: '',
  //   rating: '',
  // };
  // reciever(data: IStudent) {
  //   this.studentsData.push(data);
  // }
  // add(data: any) {
  //   this.productData = data;
  // }
}
