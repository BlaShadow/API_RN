import { Movie } from './../../services/domain/movie';
import { createReducer, ReducersType } from "../CreateReducer";
import {
  SET_POPULAR_MOVIES,
  SET_TOP_RATED_MOVIES,
  SET_KIDS_MOVIES
} from "./action";

export interface MoviesStore {
  kidsMovies: Movie[],
  topRatedMovies: Movie[],
  popularMovies: Movie[],
  moviesIntheather: Movie[]
}

export const moviesDefaultStore: MoviesStore = {
  kidsMovies: [],
  topRatedMovies: [],
  moviesIntheather: [],
  popularMovies: [],
};

const reducers: ReducersType<MoviesStore> = {
  [SET_POPULAR_MOVIES]: (state: MoviesStore, movies: Movie[]): MoviesStore => ({
    ...state,
    popularMovies: [
      ...state.popularMovies,
      ...movies
    ]
  }),
  [SET_TOP_RATED_MOVIES]: (state: MoviesStore, movies: Movie[]): MoviesStore => ({
    ...state,
    topRatedMovies: [
      ...state.topRatedMovies,
      ...movies
    ]
  }),
  [SET_KIDS_MOVIES]: (state: MoviesStore, movies: Movie[]): MoviesStore => ({
    ...state,
    kidsMovies: [
      ...state.kidsMovies,
      ...movies
    ]
  }),
};

const initialStateValue: MoviesStore = moviesDefaultStore;

export default createReducer<MoviesStore>(initialStateValue, reducers);