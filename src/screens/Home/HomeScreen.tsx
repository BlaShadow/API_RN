import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';

import { Movie } from '../../services/domain/movie';
import { RootStore } from '../../store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { 
  onFetchPopularMovies,
  onFetchTopRatedMovies,
  onFetchKidsMovies
} from '../../store/movies/action';
import MovieTile from '../../components/MovieTile';
import SectionHeader from '../../components/SectionHeader';
import { NavigationScreenProp } from 'react-navigation';
import { NavigationStackScreenOptions } from 'react-navigation-stack/lib/typescript/types';

interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>;
  topRatedMovies: Movie[];
  kidsMovies: Movie[];
  popularMovies: Movie[];

  fetchPopularMovies: () => Promise<any>;
  fetchKidsMovies: () => Promise<any>;
  fetchTopRatedMovies: () => Promise<any>;
}

type SectionType = 'POPULAR' | 'TOP' | 'KIDS';

interface SectionMovie {
  title: string;
  movies: Movie[],
  sectionType: SectionType
}

export class HomeScreen extends PureComponent<HomeScreenProps> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: 'Movies',
    headerBackTitle: ' ',
    headerTintColor: '#333333',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24
    },
    headerStyle: {
      backgroundColor: '#ffffff',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    }
  };

  public componentDidMount() {
    this.props.fetchPopularMovies()
      .then(() => {})
      .catch((error) => {
      });

    this.props.fetchTopRatedMovies()
      .then(() => {})
      .catch((error) => {
      });

    this.props.fetchKidsMovies()
      .then(() => {})
      .catch((error) => {
      });
  }

  public render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          {this.renderSectionsList()}
        </ScrollView>
      </SafeAreaView>
    );
  }

  private onPressSection = (sectionTitle: string, sectionType: SectionType) => () => {
    this.props.navigation.navigate('movieList', {title: sectionTitle});
  }

  private navigateDetails = (movie: Movie) => () => {
    this.props.navigation.navigate('movieDetails', {movie})
  }

  private renderSectionsList = () => {
    const data = this.sectionListData();
    return data.map((section, index) => {
      return (
        <View style={styles.listContainer} key={index}>
          <SectionHeader
            title={section.title}
            onPress={this.onPressSection(section.title, section.sectionType)}
          />
          <FlatList
            keyExtractor={this.keyExtractor}
            data={section.movies}
            renderItem={this.renderItem}
            horizontal={true}
            style={{marginVertical: 10}}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    });
  }

  private sectionListData = (): SectionMovie[] => {
    return [
      {
        title: 'Top Rated movies',
        movies: this.props.topRatedMovies,
        sectionType: 'TOP'
      },
      {
        title: 'Popular movies',
        movies: this.props.popularMovies,
        sectionType: 'POPULAR'
      },
      {
        title: 'Kids movies',
        movies: this.props.kidsMovies,
        sectionType: 'KIDS'
      },
    ]
  }

  private keyExtractor = (item: Movie, index: number) => `${item.id}-${index}`

  private renderItem = ({item, index}: ListRenderItemInfo<Movie>) => {
    return (
      <MovieTile
        key={index}
        movie={item}
        onPress={this.navigateDetails(item)}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 20,
    marginTop: 5
  }
});

const stateToProps = ({Movies}: RootStore) => {
  const {
    topRatedMovies = [],
    kidsMovies = [],
    popularMovies = []
  } = Movies;

  return {
    topRatedMovies,
    kidsMovies,
    popularMovies   
  }
}

const dispatchProps = (dispatch: ThunkDispatch<any, any, Action>) => {
  return {
    fetchPopularMovies: () => {
      return dispatch(onFetchPopularMovies(0));
    },
    fetchKidsMovies: () => {
      return dispatch(onFetchKidsMovies(0));
    },
    fetchTopRatedMovies: () => {
      return dispatch(onFetchTopRatedMovies(0));
    },
  }
}

export default connect(stateToProps, dispatchProps)(HomeScreen);
