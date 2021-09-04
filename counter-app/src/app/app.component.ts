import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Counter';
  counter:number = 0;

  handleIncrease = () => {
    this.counter < 10 && (this.counter += 1);
  }
  
  handleDecrease = () => {
    this.counter > 0 && (this.counter -= 1);
  }
  
  handleReset = () => {
    this.counter = 0;
  }

}
