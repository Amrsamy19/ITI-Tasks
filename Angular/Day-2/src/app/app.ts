import { Component, Output } from '@angular/core';
import { Writer } from '../writer/writer';
import { Slideshow } from '../slideshow/slideshow';
import { Login } from './login/login';
import { Home } from './home/home';
import { IStudent } from '../interfaces/student';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './Ecommerce/cards/cards';
import { AddComponent } from './Ecommerce/add/add';
import { IProduct } from '../interfaces/product';

@Component({
  selector: 'app-root',
  imports: [Writer, Slideshow, Login, Home, CommonModule, CardsComponent, AddComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  @Output() studentsData: IStudent[] = [];
  @Output() productData: IProduct = {
    name: '',
    description: '',
    image: '',
    rating: '',
  };

  reciever(data: IStudent) {
    this.studentsData.push(data);
  }

  add(data: any) {
    this.productData = data;
  }
}
