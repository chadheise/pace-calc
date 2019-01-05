/* @flow strict */
import type {Time} from "../utils/TimeUtils";

import {colors, sharedStyles} from "../utils/styles";
import TimeInputPart from "./TimeInputPart";
import React, {Component} from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

type Props = {
  time: Time,
  onChange: Time => void
};

export default class TimeInput extends Component<Props> {
  _textInput: TextInput;

  render() {
    return (
      <View style={[sharedStyles.mainButton, styles.button]}>
        <TimeInputPart
          unit="hr"
          value={this.props.time.hr}
          onChange={val =>
            this.props.onChange({
              hr: val,
              min: this.props.time.min,
              sec: this.props.time.sec
            })
          }
        />
        <TimeInputPart
          unit="min"
          value={this.props.time.min}
          onChange={val =>
            this.props.onChange({
              hr: this.props.time.hr,
              min: val,
              sec: this.props.time.sec
            })
          }
        />
        <TimeInputPart
          unit="sec"
          value={this.props.time.sec}
          onChange={val =>
            this.props.onChange({
              hr: this.props.time.hr,
              min: this.props.time.min,
              sec: val
            })
          }
        />
      </View>
    );
  }

  _focusTextInput = () => {
    this._textInput && this._textInput.focus();
  };
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.accent2
  }
});

AppRegistry.registerComponent("TimeInput", () => TimeInput);
