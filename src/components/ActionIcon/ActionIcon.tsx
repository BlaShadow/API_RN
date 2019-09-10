import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'

interface ActionIconProps {
  title: string;
  source: ImageSourcePropType;
  onPress?: () => void;
}

export class ActionIcon extends PureComponent<ActionIconProps> {
  public render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.actionIconContainer}
        onPress={this.props.onPress}
      >
        <Image style={styles.iconAction} source={this.props.source} />
        <Text>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  actionIconContainer: {
    alignSelf: 'center',
    marginHorizontal: 10,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  iconAction: {
    width: 25,
    height: 25
  },
})

export default ActionIcon;
