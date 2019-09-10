import {AnyAction} from 'redux';

interface Action extends AnyAction{
  payload?: any;
}

export interface ReducersType<State> {
  [id: string]: (state: State, payload: any) => State;
}

export type ReturnReducer<State> = (state: State, acton: Action) => any;

export function createReducer<State>(initialState: State, reducers: ReducersType<State>): ReturnReducer<State> {
  return (state = initialState, action): State => {
    return !!reducers[action.type] ? reducers[action.type](state, action.payload) : state;
  };
}
