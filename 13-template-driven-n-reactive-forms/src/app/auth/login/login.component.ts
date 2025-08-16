import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component( {
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ ReactiveFormsModule ]
} )
export class LoginComponent {
  form = new FormGroup( {
    email: new FormControl( '' ),
    password: new FormControl( '' ),
  } );

  onSubmit() {
    console.log( 'Form submitted:', this.form );
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log( 'Email:', enteredEmail, 'Password:', enteredPassword );
  }
}