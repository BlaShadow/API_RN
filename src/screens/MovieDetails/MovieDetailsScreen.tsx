import React, { PureComponent } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Movie } from '../../services/domain/movie';
import { NavigationStackScreenOptions } from 'react-navigation-stack/lib/typescript/types';
import { NavigationScreenProp, ScrollView } from 'react-navigation';
import ActionIcon from '../../components/ActionIcon';

import styles from './styles';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleFavorite } from '../../store/favorites/action';
import { RootStore } from '../../store';

interface MovieDetailsProps {
  navigation: NavigationScreenProp<any, any>;
  toggleFavorite: (identifier: number) => void;

  isFavoriteMovie: boolean;
}

export class MovieDetailsScreen extends PureComponent<MovieDetailsProps> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: ' ',
    headerTransparent: true,
    headerBackTitle: ' ',
    headerTintColor: '#FFFFFF',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    }
  };

  public render() {
    const movie = this.props.navigation.getParam('movie', {}) as Movie;

    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
        >
          <Image
            style={styles.backdropImage}
            source={{uri: `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}` }}
          />
          <View style={styles.posterContainer}>
            <Image
              style={styles.posterImage}
              resizeMode={'contain'}
              source={{uri: `https://image.tmdb.org/t/p/w342/${movie.poster_path}` }}
            />
            <View style={{flexDirection: 'column'}}>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>{`🌟 ${movie.vote_average} (${movie.vote_count})`}</Text>
                <Text style={styles.infoText}>{`📅 ${new Date(movie.release_date).toDateString()} Released`}</Text>
              </View>
              <View style={styles.actionIconContainer}>
                <ActionIcon
                  title={'Watchlist'}
                  source={require('./assets/bookmark.png')}
                />
                <ActionIcon
                  title={'Favorite'}
                  onPress={this.toggleFavorite(movie.id)}
                  source={this.favoriteIcon()}
                />
                <ActionIcon
                  title={'Share'}
                  source={require('./assets/share.png')}
                />
              </View>
            </View>
          </View>
          <View style={styles.overviewContainer}>
            <Text style={styles.overviewStyle}>{'Overview'}</Text>
            <Text>{movie.overview}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }

  private favoriteIcon = () => {
    return this.props.isFavoriteMovie ? require('./assets/like_filled.png') : require('./assets/like.png');
  }

  private toggleFavorite = (identifier: number) => () => {
    this.props.toggleFavorite(identifier);
  }
}

const dispatchProps = (dispatch: Dispatch) => {
  return {
    toggleFavorite: (identifier: number) => {
      dispatch(toggleFavorite(identifier));
    }
  }
}

const stateToProps = (store: RootStore, ownProps: MovieDetailsProps) => {
  const movie = ownProps.navigation.getParam('movie', {}) as Movie;
  const identifier = movie ? movie.id : 0;

  return {
    isFavoriteMovie: store.Favorites[identifier]
  }
}

export default connect(stateToProps, dispatchProps)(MovieDetailsScreen);
