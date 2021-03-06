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
  unit: "hr" | "min" | "sec",
  value: number,
  onChange: number => void
};

export default class TimeInputPart extends Component<Props> {
  _textInput: ?TextInput;

  render() {
    return (
      <TouchableOpacity onPress={this._focusTextInput} style={styles.container}>
        <View style={sharedStyles.wrapper}>
          <TextInput
            keyboardAppearance="dark"
            keyboardType="number-pad"
            onChangeText={this._onChangeText}
            ref={c => (this._textInput = c)}
            returnKeyType="done"
            style={sharedStyles.hiddenTextInput}
            value={this.props.value.toString()}
          />
          <Text style={[sharedStyles.text, styles.text]}>
            {this.props.value} {this.props.unit}
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
  container: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center"
  },
  text: {
    color: colors.accent2
  }
});

AppRegistry.registerComponent("TimeInputPart", () => TimeInputPart);
