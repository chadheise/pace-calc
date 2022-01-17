/* @flow strict */
import type { Time } from "../utils/TimeUtils";

import { colors, sharedStyles } from "../utils/styles";
import TimeInputPart from "./TimeInputPart";
import React, { Component, useRef } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  time: Time,
  onChange: (Time) => void,
  onFocus: () => void,
  onLayout: ({ nativeEvent: LayoutEvent }) => void,
};

export default function TimeInput(props: Props): React.Node {
  return (
    <View
      onLayout={props.onLayout}
      style={[sharedStyles.mainButton, styles.button]}
    >
      <TimeInputPart
        unit="hr"
        value={props.time.hr}
        onChange={(val) =>
          props.onChange({
            hr: val,
            min: props.time.min,
            sec: props.time.sec,
          })
        }
        onFocus={props.onFocus}
      />
      <TimeInputPart
        unit="min"
        value={props.time.min}
        onChange={(val) =>
          props.onChange({
            hr: props.time.hr,
            min: val,
            sec: props.time.sec,
          })
        }
        onFocus={props.onFocus}
      />
      <TimeInputPart
        unit="sec"
        value={props.time.sec}
        onChange={(val) =>
          props.onChange({
            hr: props.time.hr,
            min: props.time.min,
            sec: val,
          })
        }
        onFocus={props.onFocus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.accent2,
    flexWrap: "wrap",
  },
});

AppRegistry.registerComponent("TimeInput", () => TimeInput);
