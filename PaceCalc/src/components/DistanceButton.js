/*
* @flow strict
*/
import React, {Component} from "react";
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import {colors} from "../utils/styles";

type Props = {
  distance: number,
  unit: "km" | "mi",
  onPress: void => {}
};

export default class DistanceButton extends Component<Props> {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
          <Text style={styles.text}>{this._getText()}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _getText(): string {
    return this.props.distance.toString() + " " + this.props.unit;
  }
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: colors.accent1,
    borderStyle: "solid",
    padding: 3
  },
  text: {
    color: colors.accent1
  }
});

AppRegistry.registerComponent("DistanceButton", () => DistanceButton);
