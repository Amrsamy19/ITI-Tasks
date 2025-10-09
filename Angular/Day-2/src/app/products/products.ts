import { Component, Output } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { AddComponent } from '../add/add';
import { CardsComponent } from '../cards/cards';

@Component({
  imports: [AddComponent, CardsComponent],
  selector: 'app-products',
  templateUrl: './products.html',
})
export class ProductsComponent {
  @Output() product: IProduct = {
    name: '',
    description: '',
    image: '',
    rating: '',
  };

  addProduct(product: any) {
    console.log(product);
    this.product = product;
  }
}
