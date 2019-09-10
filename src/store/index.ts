import { applyMiddleware, createStore, combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import MoviesReducer, { MoviesStore, moviesDefaultStore } from './movies/reducer';
import FavoritesReducer, { FavoriteStore } from './favorites/reducer';

export interface RootStore {
  Movies: MoviesStore;
  Favorites: FavoriteStore;
}

const reducers = {
  Movies: MoviesReducer,
  Favorites: FavoritesReducer,
}

export const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk),
);

export const persistor = persistStore(store);
