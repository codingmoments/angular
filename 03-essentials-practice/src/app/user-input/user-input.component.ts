import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  initialInvestment: string = '0';
  annualInvestment: string = '0';
  expectedReturn: string = '5';
  duration: string = '10';

  onSubmit() {
    console.log('initialInvestment -- ', this.initialInvestment);
    console.log('annualInvestment -- ', this.annualInvestment);
    console.log('expectedReturn -- ', this.expectedReturn);
    console.log('duration -- ', this.duration);
  }
}
