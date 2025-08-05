import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, interval } from 'rxjs';

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

  customInterval$ = new Observable<{ message: string }>( ( subscribe ) => {
    let count = 0;
    const customInterval = setInterval( () => {
      if ( count > 3 ) {
        clearInterval( customInterval );
        subscribe.complete();
        return;
      }
      console.log( 'Emitting from customInterval$' );
      subscribe.next( { message: 'Hello from customInterval$!' } );
      count = count + 1;
    }, 2000 );
  } );

  private destroyRef = inject( DestroyRef );

  ngOnInit() {
    const customSubscription = this.customInterval$.subscribe( {
      next: ( data ) => {
        console.log( `Received the message - ${ data.message }` );
      },
      complete: () => {
        console.log( 'Custom interval completed' );
      }
    } );

    const subscription = this.clickCount$.subscribe( count => {
      console.log( `Click count: ${ count }` );
    } );

    this.destroyRef.onDestroy( () => {
      subscription.unsubscribe();
      customSubscription.unsubscribe();
    } );
  }

  onClick() {
    this.clickCount.update( count => count + 1 );
  }
}
