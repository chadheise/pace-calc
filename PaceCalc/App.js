import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import DistanceButton from "./src/components/DistanceButton";
import DistanceInput from "./src/components/DistanceInput";
import Header from "./src/components/Header";
import PaceBlock from "./src/components/PaceBlock";
import SmallBlock from "./src/components/SmallBlock";
import TimeInput from "./src/components/TimeInput";

import type Time from "./src/utils/TimeUtils";

import { kmToMiles, milesToKm, round } from "./src/utils/DistanceUtils";
import {
  secondsPerKm,
  secondsPerMile,
  formatSecondsAsTime,
  kmPerHour,
  milesPerHour,
} from "./src/utils/TimeUtils";
import { colors } from "./src/utils/styles";

type Props = {};

type State = {
  distance: number, // Always stored in km
  time: Time,
};

export default class App extends Component<Props, State> {
  state = {
    distance: 1.609344,
    time: {
      hr: 0,
      min: 0,
      sec: 0,
    },
  };

  render() {
    return (
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps={"handled"}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <Header title="Distance" />
          <View style={styles.distanceButtonContainer}>
            <DistanceButton
              distance={5}
              unit="km"
              onPress={() => this._setDistance(5, "km")}
            />
            <DistanceButton
              distance={10}
              unit="km"
              onPress={() => this._setDistance(10, "km")}
            />
            <DistanceButton
              distance={15}
              unit="km"
              onPress={() => this._setDistance(15, "km")}
            />
            <DistanceButton
              distance={20}
              unit="km"
              onPress={() => this._setDistance(20, "km")}
            />
            <DistanceButton
              distance={13.1}
              unit="mi"
              onPress={() => this._setDistance(13.1, "mi")}
            />
            <DistanceButton
              distance={26.2}
              unit="mi"
              onPress={() => this._setDistance(26.2, "mi")}
            />
          </View>

          <DistanceInput
            distance={round(kmToMiles(this.state.distance), 2)}
            unit="mi"
            onChange={(num) => {
              this._setDistance(num, "mi");
            }}
          />

          <DistanceInput
            distance={round(this.state.distance, 2)}
            unit="km"
            onChange={(num) => {
              this._setDistance(num, "km");
            }}
          />

          <Header title="Time" />

          <TimeInput
            time={this.state.time}
            onChange={(time) => this._setTime(time)}
          />

          <Header title="Pace" />

          <View style={styles.splitContainer}>
            <PaceBlock
              text={
                formatSecondsAsTime(
                  secondsPerMile(this.state.time, this.state.distance)
                ) + " /mi"
              }
            />

            <PaceBlock
              text={
                formatSecondsAsTime(
                  secondsPerKm(this.state.time, this.state.distance)
                ) + " /km"
              }
            />
          </View>

          <View style={styles.splitContainer}>
            <PaceBlock
              text={
                round(milesPerHour(this.state.time, this.state.distance), 3) +
                " mi/hr"
              }
            />

            <PaceBlock
              text={
                round(kmPerHour(this.state.time, this.state.distance), 3) +
                " km/hr"
              }
            />
          </View>

          <Header title="Proportional Race Times" />

          <View style={styles.splitContainer}>
            <SmallBlock
              text={
                "5 km: " +
                formatSecondsAsTime(
                  secondsPerKm(this.state.time, this.state.distance) * 5
                )
              }
            />

            <SmallBlock
              text={
                "10 km: " +
                formatSecondsAsTime(
                  secondsPerKm(this.state.time, this.state.distance) * 10
                )
              }
            />
          </View>

          <View style={styles.splitContainer}>
            <SmallBlock
              text={
                "15 km: " +
                formatSecondsAsTime(
                  secondsPerKm(this.state.time, this.state.distance) * 15
                )
              }
            />

            <SmallBlock
              text={
                "20 km: " +
                formatSecondsAsTime(
                  secondsPerKm(this.state.time, this.state.distance) * 20
                )
              }
            />
          </View>

          <View style={styles.splitContainer}>
            <SmallBlock
              text={
                "13.1 mi: " +
                formatSecondsAsTime(
                  secondsPerMile(this.state.time, this.state.distance) * 13.1
                )
              }
            />

            <SmallBlock
              text={
                "26.2 mi: " +
                formatSecondsAsTime(
                  secondsPerMile(this.state.time, this.state.distance) * 26.2
                )
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  _setDistance = (distance: number, unit: string) => {
    if (unit === "mi") {
      distance = milesToKm(distance);
    }
    if (distance < 16093.45) {
      // Max input allowed is 10000 mi
      this.setState({
        distance: distance,
      });
    }
  };

  _setTime(time: Time) {
    if (
      0 <= time.hr &&
      time.hr < 100 &&
      0 <= time.min &&
      time.min < 60 &&
      0 <= time.sec &&
      time.sec < 60
    ) {
      this.setState({
        time: time,
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  distanceButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  scrollView: {
    backgroundColor: colors.background,
  },
  splitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
