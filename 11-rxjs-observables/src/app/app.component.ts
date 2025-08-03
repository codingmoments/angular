import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { interval, map } from 'rxjs';

@Component( {
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
} )
export class AppComponent implements OnInit {
  private destroyRef = inject( DestroyRef );

  ngOnInit() {
    const subscription = interval( 1000 )
      .pipe( map( value => value * 2 ) )
      .subscribe( {
        next: ( value ) => {
          console.log( 'Interval value:', value );
        }
      } );

    this.destroyRef.onDestroy( () => {
      subscription.unsubscribe();
    } );
  }

}
