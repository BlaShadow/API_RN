import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

interface SectionHeaderProps {
  onPress: () => void;
  title: string;
}

export class SectionHeader extends PureComponent<SectionHeaderProps> {
  public render() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={this.props.onPress}
        style={styles.wrap}
      >
        <Text
          style={styles.header}
        >{this.props.title}
        </Text>
        <Text style={styles.viewMore}>
          {'View more'}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 22,
    marginHorizontal: 5
  },
  viewMore: {
    fontSize: 15,
    color: 'red',
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center'
  }
});

export default SectionHeader;
