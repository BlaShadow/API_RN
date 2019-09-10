import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation-stack';

import {
  NavigationRouteConfigMap,
  createAppContainer
} from 'react-navigation';

import HomeScreen from '../screens/Home';
import MoviesListScreen from '../screens/MovieList';
import MovieDetailsScreen from '../screens/MovieDetails';

const screenConfig: NavigationRouteConfigMap = {
  home: {
    screen: HomeScreen,
  },
  movieList: {
    screen: MoviesListScreen,
  },
  movieDetails: {
    screen: MovieDetailsScreen
  }
}

const stackConfig = {
  initialRouteName: 'home',
}

const stacknavigation = createStackNavigator(screenConfig, stackConfig);

export default createAppContainer(stacknavigation);
