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
  unit: "hr" | "min" | "sec",
  value: number,
  onChange: (number) => void,
  onFocus: () => void,
};

export default function TimeInputPart(props: Props) {
  const inputRef = useRef<TextInput>(null);

  const focusTextInput = () => {
    inputRef.current.focus();
    props.onFocus();
  };

  const onChangeText = (text: string) => {
    props.onChange(Number(text));
  };

  return (
    <TouchableOpacity onPress={focusTextInput} style={styles.container}>
      <View style={sharedStyles.wrapper}>
        <TextInput
          keyboardAppearance="dark"
          keyboardType="number-pad"
          onChangeText={onChangeText}
          ref={inputRef}
          returnKeyType="done"
          style={sharedStyles.hiddenTextInput}
          value={props.value.toString()}
        />
        <Text style={[sharedStyles.text, styles.text]}>
          {props.value} {props.unit}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  text: {
    color: colors.accent2,
  },
});

AppRegistry.registerComponent("TimeInputPart", () => TimeInputPart);
