/*
* @flow strict
*/
import {StyleSheet} from "react-native";

export const colors = {
  background: "#282828",
  primary: "white",
  accent1: "#51db96",
  accent2: "#ff6b63",
  accent3: "#5bd4e5",
  accent4: "#f2a348"
};

export const sharedStyles = StyleSheet.create({
  mainButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: "solid",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "stretch",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  hiddenTextInput: {
    width: 0,
    height: 0
  },
  wrapper: {
    flexDirection: "row"
  },
  text: {
    fontSize: 28,
    color: colors.primary
  },
  splitBlock: {
    borderStyle: "dashed",
    paddingLeft: 5,
    paddingRight: 5,
    width: '48%',
  }
});
