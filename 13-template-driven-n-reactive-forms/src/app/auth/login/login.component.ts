import { Component, DestroyRef, afterNextRender, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';

@Component( {
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ FormsModule ],
} )
export class LoginComponent {
  private form = viewChild.required<NgForm>( 'loginForm' );
  private destroyRef = inject( DestroyRef )

  constructor() {
    afterNextRender( () => {
      const subscription = this.form().valueChanges?.
        pipe( debounceTime( 500 ) )
        .subscribe( {
          next: ( value ) => {
            console.log( 'Form value changed:', value );
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify( { email: value.email } )
            );
          }
        } );

      this.destroyRef.onDestroy( () => {
        subscription?.unsubscribe();
      } );
    } );
  }

  onSubmit( formData: NgForm ) {
    if ( formData.form.invalid ) {
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    console.log( enteredEmail, enteredPassword );
    console.log( formData.form );

    formData.form.reset();
  }
}
