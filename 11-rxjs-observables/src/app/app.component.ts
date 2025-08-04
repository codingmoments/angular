import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component( {
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
} )
export class AppComponent implements OnInit {
  clickCount = signal( 0 );
  clickCount$ = toObservable( this.clickCount );

  interval$ = interval( 1000 );
  interval = toSignal( this.interval$, { initialValue: 0 } );

  private destroyRef = inject( DestroyRef );

  ngOnInit() {
    const subscription = this.clickCount$.subscribe( count => {
      console.log( `Click count: ${ count }` );
    } );

    this.destroyRef.onDestroy( () => {
      subscription.unsubscribe();
    } );
  }

  onClick() {
    this.clickCount.update( count => count + 1 );
  }
}
