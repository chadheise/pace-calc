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
  distance: number,
  unit: "km" | "mi",
  onChange: number => void
};

export default class DistanceInput extends Component<Props> {
  _textInput: ?TextInput;

  render() {
    return (
      <TouchableOpacity
        onPress={this._focusTextInput}
        style={[sharedStyles.mainButton, styles.button]}
      >
        <View style={sharedStyles.wrapper}>
          <TextInput
            ref={c => (this._textInput = c)}
            keyboardType="numeric"
            returnKeyType="done"
            keyboardAppearance="dark"
            onChangeText={this._onChangeText}
            style={sharedStyles.hiddenTextInput}
          />
          <Text style={[sharedStyles.text, styles.text]}>
            {this.props.distance} {this.props.unit}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  _focusTextInput = () => {
    this._textInput && this._textInput.focus();
  };

  _onChangeText = (text: string) => {
    this.props.onChange(Number(text));
  };
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.accent1
  },
  text: {
    color: colors.accent1
  }
});

AppRegistry.registerComponent("DistanceInput", () => DistanceInput);
