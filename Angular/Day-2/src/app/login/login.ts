import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  name: string = '';
  age: string = '';
  @Output() dataSender = new EventEmitter();

  add() {
    this.dataSender.emit({
      name: this.name,
      age: this.age,
    });

    this.name = '';
    this.age = '';
  }
}
