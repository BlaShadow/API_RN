import { fetchTopRatedMovies, fetchKidsMovies } from './../../services/MovieApiClient';
import { Movie } from './../../services/domain/movie';
import { RootStore } from '..';
import { fetchPopularMovies } from '../../services/MovieApiClient';

export const SET_POPULAR_MOVIES = 'SET_POPULAR_MOVIES';

export const setPopularMovies = (movies: Movie[]) => ({
  type: SET_POPULAR_MOVIES,
  payload: movies
});

export const SET_TOP_RATED_MOVIES = 'SET_TOP_RATED_MOVIES';

export const setTopRatedMovies = (movies: Movie[]) => ({
  type: SET_TOP_RATED_MOVIES,
  payload: movies
});

export const SET_KIDS_MOVIES = 'SET_KIDS_MOVIES';

export const setKidsMovies = (movies: Movie[]) => ({
  type: SET_KIDS_MOVIES,
  payload: movies
});

export const onFetchPopularMovies = (page: number): (dispatch: any) => Promise<any> => {
  return (dispatch) => {
    return fetchPopularMovies(page)
      .then((movies) => {
        dispatch(setPopularMovies(movies));

        return Promise.resolve(movies);
      });
  }
}

export const onFetchTopRatedMovies = (page: number): (dispatch: any) => Promise<any> => {
  return (dispatch) => {
    return fetchTopRatedMovies(page)
      .then((movies) => {
        dispatch(setTopRatedMovies(movies));

        return Promise.resolve(movies);
      });
  }
}

export const onFetchKidsMovies = (page: number): (dispatch: any) => Promise<any> => {
  return (dispatch) => {
    return fetchKidsMovies(page)
      .then((movies) => {
        dispatch(setKidsMovies(movies));

        return Promise.resolve(movies);
      });
  }
}
