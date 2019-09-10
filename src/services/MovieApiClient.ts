import { Movie } from './domain/movie';
import Axios from "axios";

const API_KEY = 'd5ab1c88c6fa0649cd46d8723ada06a0';
const baseApiUrl = 'https://api.themoviedb.org/3';

type SortBy = 'popularity.desc' | 'vote_average.desc';

const fetchMovies = (page: number, sortBy: SortBy): Promise<Movie[]> => {
  const url = `${baseApiUrl}/discover/movie`;
  const params = {
    api_key: API_KEY,
    sort_by: sortBy,
  }

  return Axios.get(url, {params})
    .then((response) => {
      return Promise.resolve(response.data.results);
    })
}

export const fetchPopularMovies = (page: number): Promise<Movie[]> => {
  return fetchMovies(page, 'popularity.desc');
}

export const fetchTopRatedMovies = (page: number) => {
  return fetchMovies(page, 'vote_average.desc');
}

export const fetchKidsMovies = (page: number) => {
  const url = `${baseApiUrl}/discover/movie`;
  const params = {
    api_key: API_KEY,
    sort_by: 'popularity.desc',
    'certification_country': 'US',
    'certification.lte': 'G'
  }

  return Axios.get(url, {params})
    .then((response) => {
      return Promise.resolve(response.data.results);
    })
}

export const fetchInTheatresMovies = (page: number) => {
  return fetchMovies(page, 'vote_average.desc');
}