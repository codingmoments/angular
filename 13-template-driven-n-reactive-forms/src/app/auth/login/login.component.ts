import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

function mustContainQuestionMark( control: AbstractControl ) {
  const value = control.value;
  if ( value && !value.includes( '?' ) ) {
    return { doesNotContainQuestionMark: true };
  }
  return null;
}

function emailIsUnique( control: AbstractControl ) {
  // Simulating an asynchronous check for email uniqueness
  // In a real application, this would likely involve an HTTP request to a server
  if ( control.value === 'test@example.com' ) {
    return of( { emailNotUnique: true } );
  }
  return of( null );
}

@Component( {
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ ReactiveFormsModule ]
} )
export class LoginComponent {
  form = new FormGroup( {
    email: new FormControl( '', {
      validators: [ Validators.email, Validators.required ],
      asyncValidators: [ emailIsUnique ],
    } ),
    password: new FormControl( '', {
      validators: [ Validators.required, Validators.minLength( 6 ), mustContainQuestionMark ],
    } ),
  } );

  get emailIsInvalid() {
    return this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid;
  }

  get passwordIsInvalid() {
    return this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid;
  }

  onSubmit() {
    console.log( 'Form submitted:', this.form );
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log( 'Email:', enteredEmail, 'Password:', enteredPassword );
  }
}