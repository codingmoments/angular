import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component( {
  selector: 'app-auth',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: 'auth.component.html',
  styleUrl: 'auth.component.css'
} )
export class AuthComponent {
  private authService = inject( AuthService );

  onSignUp( form: NgForm ) {
    if ( form.valid ) {
      let username = form.value.username;
      let password = form.value.password;

      this.authService.signUp( username, password ).subscribe( response => {
        console.log( response );
      }, error => {
        console.error( error );
      } );
    }
    form.reset();
  }

  onLogin( orm: NgForm ) {
  }
}
