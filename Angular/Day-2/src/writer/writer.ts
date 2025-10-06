import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-writer',
  imports: [FormsModule],
  templateUrl: './writer.html',
  styleUrls: ['./writer.css'],
})
export class Writer {
  textValue: string = '';

  resetInput() {
    this.textValue = '';
  }
}
