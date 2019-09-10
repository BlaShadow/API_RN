import React, { PureComponent } from 'react'
import { Text, View, FlatList, ListRenderItemInfo, SafeAreaView } from 'react-native'
import { Movie } from '../../services/domain/movie'
import MovieTile from '../../components/MovieTile'
import { RootStore } from '../../store'
import { connect } from 'react-redux'
import { NavigationStackScreenOptions } from 'react-navigation-stack/lib/typescript/types'
import { NavigationScreenProp } from 'react-navigation'

interface MoviesListProps {
  navigation: NavigationScreenProp<any, any>;
  title: string;
  movies: Movie[];
}

export class MoviesListScreen extends PureComponent<MoviesListProps> {
  static navigationOptions: NavigationStackScreenOptions = ({ navigation }) => {
    const params = navigation.state.params;
    const title = params ? params.title : 'Movies List';

    return {
      title,
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
    }
  }

  public componentDidMount() {
    
  }

  public render() {
    return (
      <SafeAreaView
        style={{flex: 1}}
      >
        <FlatList
          style={{flex: 1}}
          numColumns={2}
          data={this.props.movies}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </SafeAreaView>
    )
  }

  private keyExtractor = (item: Movie, index: number) => `${item.id}-${index}`

  private navigateDetails = (movie: Movie) => () => {
    this.props.navigation.navigate('movieDetails', {movie})
  }

  private renderItem = ({item, index}: ListRenderItemInfo<Movie>) => {
    return (
      <MovieTile
        onPress={this.navigateDetails(item)}
        key={index}
        movie={item}
        imageStyle={{
          height: 250
        }}
      />
    );
  }
}

const stateToProps = (store: RootStore) => {
  return {
    title: 'Test',
    movies: store.Movies.kidsMovies
  }
}

export default connect(stateToProps)(MoviesListScreen);
