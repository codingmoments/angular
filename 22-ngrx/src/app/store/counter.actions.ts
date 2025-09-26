import { createAction, props } from "@ngrx/store";

// Action to trigger the side-effect of loading the count from local storage
export const loadFromLocalStorage = createAction( 'Load from Local Storage' );

// Action that will be dispatched at the end of the side-effect
export const initialize = createAction(
  'Initialize Store',
  props<{ counter: number }>()
);

export const increment = createAction(
  'Increment',
  props<{ incrementBy: number }>()
);

export const decrement = createAction(
  'Decrement',
  props<{ decrementBy: number }>()
);