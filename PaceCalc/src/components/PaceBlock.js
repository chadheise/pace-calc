/*
* @flow strict
*/
import React, {Component} from "react";
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import {colors, sharedStyles} from "../utils/styles";

type Props = {
  text: string
};

export default class PaceBlock extends Component<Props> {
  render() {
    return (
      <View
        style={[
          sharedStyles.mainButton,
          sharedStyles.splitBlock,
          styles.button
        ]}
      >
        <Text style={[sharedStyles.text, styles.text]}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.accent3
  },
  text: {
    color: colors.accent3
  }
});

AppRegistry.registerComponent("PaceBlock", () => PaceBlock);
