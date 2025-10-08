import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../interfaces/product';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.html',
  styleUrls: ['./cards.css'],
})
export class CardsComponent implements OnChanges {
  products: IProduct[] = [];
  @Input() product: IProduct = {
    name: '',
    description: '',
    image: '',
    rating: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['product'].firstChange) {
      this.products.push(changes['product'].currentValue);
    }
  }
}
