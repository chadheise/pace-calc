/*
 * @flow strict
 */
import React, { Component, useRef } from "react";

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

export default function DistanceInput(props: Props): React.Node {
  const inputRef = useRef<TextInput>(null);

  const focusTextInput = () => {
    inputRef.current.focus();
  };

  const onChangeText = (text: string) => {
    text = sanitizeText(text);
    props.onChange(text);
  };

  const textInputValue = sanitizeText(props.distance);

  return (
    <TouchableOpacity
      onPress={focusTextInput}
      style={[sharedStyles.mainButton, styles.button]}
    >
      <View style={sharedStyles.wrapper}>
        <TextInput
          keyboardAppearance="dark"
          keyboardType="numeric"
          ref={inputRef}
          returnKeyType="done"
          onChangeText={onChangeText}
          style={sharedStyles.hiddenTextInput}
          value={textInputValue}
        />
        <Text style={[sharedStyles.text, styles.text]}>
          {textInputValue} {props.unit}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function sanitizeText(text: string): string {
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
