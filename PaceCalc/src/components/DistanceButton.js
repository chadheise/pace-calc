/*
 * @flow strict
 */
import React, { Component } from "react";
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { colors } from "../utils/styles";

type Props = {
  distance: number,
  unit: "km" | "mi",
  onPress: (void) => {},
};

export default function DistanceButton(props: Props): React.Node {
  const text = props.distance.toString() + " " + props.unit;
  return (
    <View>
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: colors.accent1,
    borderStyle: "solid",
    padding: 3,
  },
  text: {
    color: colors.accent1,
  },
});

AppRegistry.registerComponent("DistanceButton", () => DistanceButton);
