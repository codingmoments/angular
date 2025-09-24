import { Action } from "@ngrx/store";
import { CounterActions, IncrementAction } from "./counter.actions";

const initialState = 0;

// export const counterReducer = createReducer(
//   initialState,
//   on( increment, (state, action) => state + action.incrementBy )
// );

export function counterReducer( state = initialState, action: CounterActions | Action ) {
  if ( action.type === 'Increment' ) {
    return state + (action as IncrementAction).incrementBy;
  }

  return state;
}