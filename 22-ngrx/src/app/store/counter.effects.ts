import { Inject, inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap, withLatestFrom } from "rxjs";
import { decrement, increment } from "./counter.actions";
import { selectCount } from "./counter.selectors";

@Injectable()
export class CounterEffects {

  private actions$ = inject( Actions );
  private store = inject( Store<{ counter: number }> );

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