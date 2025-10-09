import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  imports: [FormsModule],
  templateUrl: './add.html',
  styleUrls: ['./add.css'],
})
export class AddComponent {
  productName: string = '';
  productDescription: string = '';
  productImage: string = '';
  productRating: string = '';

  @Output() eventData = new EventEmitter();

  add() {
    this.eventData.emit({
      name: this.productName,
      description: this.productDescription,
      image: this.productImage,
      rating: this.productRating,
    });
  }
}
