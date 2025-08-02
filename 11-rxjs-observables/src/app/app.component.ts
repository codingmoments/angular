import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { interval } from 'rxjs';

@Component( {
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
} )
export class AppComponent implements OnInit {
  private destroyRef = inject( DestroyRef );

  ngOnInit() {
    const subscription = interval( 1000 ).subscribe( {
      next: ( value ) => {
        console.log( 'Interval value:', value );
      },
      error: ( err ) => {
        console.error( 'Error occurred:', err );
      },
      complete: () => {
        console.log( 'Interval completed' );
      }
    } );

    this.destroyRef.onDestroy( () => {
      subscription.unsubscribe();
    } );
  }

}
