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
  title: string,
};

export default function Header(props: Props): React.Node {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
  },
  header: {
    fontSize: 20,
    color: colors.primary,
  },
});

AppRegistry.registerComponent("Header", () => Header);
