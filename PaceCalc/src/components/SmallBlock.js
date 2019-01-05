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

export default class SmallBlock extends Component<Props> {
  render() {
    return (
      <View
        style={[
          sharedStyles.mainButton,
          sharedStyles.splitBlock,
          styles.button
        ]}
      >
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.accent4
  },
  text: {
    fontSize: 20,
    color: colors.accent4
  }
});

AppRegistry.registerComponent("SmallBlock", () => SmallBlock);
