import { FavoriteStore } from './reducer';
import { createReducer, ReducersType } from "../CreateReducer";
import { TOGGLE_FAVORITE } from "./action";

export interface FavoriteStore {
  [id: number]: boolean
};

export const defaultState: FavoriteStore = {
}


const reducers: ReducersType<FavoriteStore> = {
  [TOGGLE_FAVORITE]: (state: FavoriteStore, identifier: number): FavoriteStore => {
    return {
      ...state, 
      [identifier]: !state[identifier]
    }
  },
};

const initialStateValue: FavoriteStore = defaultState;

export default createReducer<FavoriteStore>(initialStateValue, reducers);