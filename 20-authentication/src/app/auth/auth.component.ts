import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: 'auth.component.html',
  styleUrl: 'auth.component.css'
})
export class AuthComponent {
  username = '';
  password = '';

  onLogin() {
    if (this.username && this.password) {
      console.log('Login attempt:', { username: this.username, password: this.password });
      // Add authentication logic here
    } else {
      console.log('Please enter both username and password');
    }
  }

  onSignUp() {
    if (this.username && this.password) {
      console.log('Sign up attempt:', { username: this.username, password: this.password });
      // Add sign up logic here
    } else {
      console.log('Please enter both username and password');
    }
  }
}
