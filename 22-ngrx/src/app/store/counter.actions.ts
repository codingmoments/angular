import { createAction, props } from "@ngrx/store";

export const increment = createAction(
  'Increment',
  props<{ incrementBy: number }>()
);