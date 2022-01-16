/*
 * @flow strict
 */
import React, { Component } from "react";
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { colors, sharedStyles } from "../utils/styles";

type Props = {
  distance: string,
  unit: "km" | "mi",
  onChange: (distance: string) => void,
};

export default class DistanceInput extends Component<Props, State> {
  _textInput: ?TextInput;

  render() {
    const textInputValue = this._sanitizeText(this.props.distance);

    return (
      <TouchableOpacity
        onPress={this._focusTextInput}
        style={[sharedStyles.mainButton, styles.button]}
      >
        <View style={sharedStyles.wrapper}>
          <TextInput
            keyboardAppearance="dark"
            keyboardType="numeric"
            ref={(c) => (this._textInput = c)}
            returnKeyType="done"
            onChangeText={this._onChangeText}
            style={sharedStyles.hiddenTextInput}
            value={textInputValue}
          />
          <Text style={[sharedStyles.text, styles.text]}>
            {textInputValue} {this.props.unit}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  _focusTextInput = () => {
    this._textInput && this._textInput.focus();
  };

  _sanitizeText = (text: string) => {
    // Trim duplicate trailing decimals
    const prefix = text.substring(0, text.length - 1);
    if (prefix.includes(".") && text[text.length - 1] === ".") {
      text = text.substring(0, text.length - 1);
    }

    // If it starts with decminal, prefix with 0
    if (text[0] === ".") {
      text = "0" + text;
    }

    // Only allow 2 decimal places as input
    const decimalIndex = text.indexOf(".");
    const hasDecimal = decimalIndex != -1;
    text = hasDecimal ? text.substring(0, decimalIndex + 3) : text;

    return text;
  };

  _onChangeText = (text: string) => {
    text = this._sanitizeText(text);
    this.props.onChange(text);
  };
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.accent1,
  },
  text: {
    color: colors.accent1,
  },
});

AppRegistry.registerComponent("DistanceInput", () => DistanceInput);
