import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of, switchMap, tap, withLatestFrom } from "rxjs";
import { decrement, increment, initialize, loadFromLocalStorage } from "./counter.actions";
import { selectCount } from "./counter.selectors";

@Injectable()
export class CounterEffects {

  private actions$ = inject( Actions );
  private store = inject( Store<{ counter: number }> );

  loadCount = createEffect( () => {
    return this.actions$.pipe(
      ofType( loadFromLocalStorage ),
      switchMap( () => {
        const storedCounter = localStorage.getItem( 'count' );
        let counter = 0;
        if ( storedCounter ) {
          counter = +storedCounter;
        }
        return of( initialize( { counter } ) );
      } )
    );
  } );

  saveCount = createEffect( () => {
    return this.actions$.pipe(
      ofType( increment, decrement ),
      withLatestFrom( this.store.select( selectCount ) ),
      tap( ( [ action, currentCounter ] ) => {
        console.log( 'Action :', action.type );
        localStorage.setItem(
          'count',
          currentCounter.toString()
        );
      } )
    );
  }, { dispatch: false } );
}