import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component( {
  selector: 'app-auth',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: 'auth.component.html',
  styleUrl: 'auth.component.css'
} )
export class AuthComponent {

  onSignUp( form: NgForm ) {

  }

  onLogin( orm: NgForm ) {
  }
}
