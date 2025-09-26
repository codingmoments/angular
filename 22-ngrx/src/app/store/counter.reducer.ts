import { createReducer, on } from "@ngrx/store";
import { decrement, increment, initialize } from "./counter.actions";

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on( increment, ( state, action ) => state + action.incrementBy ),
  on( decrement, ( state, action ) => state - action.decrementBy ),
  on( initialize, ( state, action ) => action.counter )
);
