import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  actionIconContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    paddingVertical: 10
  },
  posterImage: {
    width: 100,
    height: 150,
    marginHorizontal: 20,
    position: 'relative',
    top: -80,
    borderColor: '#FFF',
    borderWidth: 2
  },
  backdropImage: {
    alignSelf: 'stretch',
    minWidth: 200,
    minHeight: 300,
  },
  posterContainer: {
    height: 80,
    flexDirection: 'row'
  },
  infoText: {
    color: '#FFF',
    fontSize: 14
  },
  infoContainer: {
    position: 'relative',
    top: -80,
  },
  overviewStyle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 15
  },
  overviewContainer: {
    paddingHorizontal: 15
  }
});
