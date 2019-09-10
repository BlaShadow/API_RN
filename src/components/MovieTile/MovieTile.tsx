import React, { PureComponent } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, Animated, Easing, ImageStyle } from 'react-native'
import { Movie } from '../../services/domain/movie'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface MovieTileProps {
  onPress: () => void;
  movie: Movie
  imageStyle?: ImageStyle;
}

export class MovieTile extends PureComponent<MovieTileProps> {
  private animatedValue: Animated.Value;

  public constructor(props: any) {
    super(props);

    this.animatedValue = new Animated.Value(0);
  }

  public render() {
    const interpolation = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.8],
    });

    const transformStyle = {
      transform: [
        { scale: interpolation },
      ],
    };

    return (
      <AnimatedTouchable
        style={[styles.wrap, transformStyle]}
        activeOpacity={0.5}
        onPressIn={this.onPressIn}
        onPressOut={this.onPresOut}
        onPress={this.props.onPress}
      >
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500/${this.props.movie.poster_path}`}}
          style={[styles.tileImage, this.props.imageStyle]}
        />
      </AnimatedTouchable>
    )
  }

  private onPressIn = () => {
    this.animatedValue.setValue(0);

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1.2,
      useNativeDriver: true,
    }).start();
  }

  private onPresOut = () => {
    this.animatedValue.setValue(1);

    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 1.2,
      useNativeDriver: true,
    }).start();
  }
}

const styles = StyleSheet.create({
  tileImage: {
    alignSelf: 'stretch',
    minWidth: 100,
    minHeight: 150,
    borderRadius: 10
  },
  wrap: {
    flex: 1,
    margin: 10,
  },
});

export default MovieTile;
