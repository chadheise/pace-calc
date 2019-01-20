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

type State = {
  hasDecimalEnding: boolean,
}

export default class DistanceInput extends Component<Props, State> {
  state = {
    hasDecimalEnding: false,
  }

  _textInput: ?TextInput;

  render() {
    const textInputValue = this.state.hasDecimalEnding ? this.props.distance.toString() + "." : this.props.distance.toString();

    return (
      <TouchableOpacity
        onPress={this._focusTextInput}
        style={[sharedStyles.mainButton, styles.button]}
      >
        <View style={sharedStyles.wrapper}>
          <TextInput
            keyboardAppearance="dark"
            keyboardType="numeric"
            ref={c => (this._textInput = c)}
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

  _onChangeText = (text: string) => {
    // Trim duplicate trailing decimals
    if (text[text.length - 1] === '.' && text[text.length - 2] === '.') {
      text = text.substring(0, text.length - 1);
    }

    const decimalIndex = text.indexOf('.');
    this.setState({
      hasDecimalEnding: text.length > 0 && decimalIndex === text.length - 1,
    })

    const hasDecimal = decimalIndex != - 1;
    // Only allow 2 decimal places as input
    text = hasDecimal ? text.substring(0, decimalIndex + 3) : text;
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
