import { createAction, props } from "@ngrx/store";

export const increment = createAction(
  'Increment',
  props<{ incrementBy: number }>()
);

export const decrement = createAction(
  'Decrement',
  props<{ decrementBy: number }>()
);