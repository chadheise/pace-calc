import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import DistanceButton from "./src/components/DistanceButton";
import DistanceInput from "./src/components/DistanceInput";
import Header from "./src/components/Header";
import PaceBlock from "./src/components/PaceBlock";
import SmallBlock from "./src/components/SmallBlock";
import TimeInput from "./src/components/TimeInput";

import type Time from "./src/utils/TimeUtils";

import {
  round,
  distanceStringToKm,
  distanceStringToKmString,
  distanceStringToMiString,
} from "./src/utils/DistanceUtils";
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
  distanceString: string,
  distanceUnit: "mi" | "km",
  time: Time,
};

export default class App extends Component<Props, State> {
  state = {
    distanceString: "1",
    distanceUnit: "mi",
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
              onPress={() => this._setDistance("5", "km")}
            />
            <DistanceButton
              distance={10}
              unit="km"
              onPress={() => this._setDistance("10", "km")}
            />
            <DistanceButton
              distance={15}
              unit="km"
              onPress={() => this._setDistance("15", "km")}
            />
            <DistanceButton
              distance={20}
              unit="km"
              onPress={() => this._setDistance("20", "km")}
            />
            <DistanceButton
              distance={13.1}
              unit="mi"
              onPress={() => this._setDistance("13.1", "mi")}
            />
            <DistanceButton
              distance={26.2}
              unit="mi"
              onPress={() => this._setDistance("26.2", "mi")}
            />
          </View>

          <DistanceInput
            distance={distanceStringToMiString(
              this.state.distanceString,
              this.state.distanceUnit
            )}
            unit="mi"
            onChange={(distance: string) => {
              this._setDistance(distance, "mi");
            }}
          />

          <DistanceInput
            distance={distanceStringToKmString(
              this.state.distanceString,
              this.state.distanceUnit
            )}
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
                  secondsPerMile(
                    this.state.time,
                    distanceStringToKm(
                      this.state.distanceString,
                      this.state.distanceUnit
                    )
                  )
                ) + " /mi"
              }
            />

            <PaceBlock
              text={
                formatSecondsAsTime(
                  secondsPerKm(
                    this.state.time,
                    distanceStringToKm(
                      this.state.distanceString,
                      this.state.distanceUnit
                    )
                  )
                ) + " /km"
              }
            />
          </View>

          <View style={styles.splitContainer}>
            <PaceBlock
              text={
                round(
                  milesPerHour(
                    this.state.time,
                    distanceStringToKm(
                      this.state.distanceString,
                      this.state.distanceUnit
                    )
                  ),
                  3
                ) + " mi/hr"
              }
            />

            <PaceBlock
              text={
                round(
                  kmPerHour(
                    this.state.time,
                    distanceStringToKm(
                      this.state.distanceString,
                      this.state.distanceUnit
                    )
                  ),
                  3
                ) + " km/hr"
              }
            />
          </View>

          <Header title="Proportional Race Times" />

          <View style={styles.splitContainer}>
            <SmallBlock
              text={
                "5 km: " +
                formatSecondsAsTime(
                  secondsPerKm(
                    this.state.time,
                    distanceStringToKm(
                      this.state.distanceString,
                      this.state.distanceUnit
                    )
                  ) * 5
                )
              }
            />

            <SmallBlock
              text={
                "10 km: " +
                formatSecondsAsTime(
                  secondsPerKm(
                    this.state.time,
                    distanceStringToKm(
                      this.state.distanceString,
                      this.state.distanceUnit
                    )
                  ) * 10
                )
              }
            />
          </View>

          <View style={styles.splitContainer}>
            <SmallBlock
              text={
                "15 km: " +
                formatSecondsAsTime(
                  secondsPerKm(
                    this.state.time,
                    distanceStringToKm(
                      this.state.distanceString,
                      this.state.distanceUnit
                    )
                  ) * 15
                )
              }
            />

            <SmallBlock
              text={
                "20 km: " +
                formatSecondsAsTime(
                  secondsPerKm(
                    this.state.time,
                    distanceStringToKm(
                      this.state.distanceString,
                      this.state.distanceUnit
                    )
                  ) * 20
                )
              }
            />
          </View>

          <View style={styles.splitContainer}>
            <SmallBlock
              text={
                "13.1 mi: " +
                formatSecondsAsTime(
                  secondsPerMile(
                    this.state.time,
                    distanceStringToKm(
                      this.state.distanceString,
                      this.state.distanceUnit
                    )
                  ) * 13.1
                )
              }
            />

            <SmallBlock
              text={
                "26.2 mi: " +
                formatSecondsAsTime(
                  secondsPerMile(
                    this.state.time,
                    distanceStringToKm(
                      this.state.distanceString,
                      this.state.distanceUnit
                    )
                  ) * 26.2
                )
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  _setDistance = (distance: string, unit: "km" | "mi") => {
    // Max input is 9 characters
    // This cannot be done inside DistanceInput because restricting the character count when inputing in km would artificially restrict the converted amount in miles and vice-versa
    if (distance.length > 9) {
      distance = distance.substring(0, 9);
    }

    this.setState({
      distanceString: distance,
      distanceUnit: unit,
    });
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
