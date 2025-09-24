import { Action, createAction, props } from "@ngrx/store";

// export const increment = createAction(
//   'Increment',
//   props<{ incrementBy: number }>()
// );

export class IncrementAction implements Action {
  readonly type = 'Increment';
  constructor( public incrementBy: number ) { }
}

export type CounterActions = IncrementAction;