import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-auth',
  standalone: true,
  imports: [ FormsModule, LoadingSpinnerComponent ],
  templateUrl: 'auth.component.html',
  styleUrl: 'auth.component.css'
} )
export class AuthComponent {
  private authService = inject( AuthService );
  private router = inject( Router );

  isLoading = false;
  error: string = '';

  onSignUp( form: NgForm ) {
    if ( form.valid ) {
      this.isLoading = true;

      let username = form.value.username;
      let password = form.value.password;

      this.authService.signUp( username, password ).subscribe( {
        next: ( response ) => {
          console.log( response );
          this.isLoading = false;
          form.reset();
          this.router.navigate( ['/users', 'u1', 'tasks'] );
        },
        error: ( errorMessage ) => {
          console.log( errorMessage ); 
          this.error = errorMessage;
          this.isLoading = false;
        }
      } );
    }
  }

  onLogin( form: NgForm ) {
  }
}
