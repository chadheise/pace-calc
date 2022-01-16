import React, { Component, useState } from "react";
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

export default function App(props: Props): React.Node {
  const [distance, setDistanceState] = useState({ label: "1", unit: "mi" });
  const [time, setTimeState] = useState({
    hr: 0,
    min: 0,
    sec: 0,
  });

  const setDistance = (distance: string, unit: "km" | "mi") => {
    // Max input is 9 characters
    // This cannot be done inside DistanceInput because restricting the character count when inputing in km would artificially restrict the converted amount in miles and vice-versa
    if (distance.length > 9) {
      distance = distance.substring(0, 9);
    }

    setDistanceState({ label: distance, unit });
  };

  const setTime = (time: Time) => {
    if (
      0 <= time.hr &&
      time.hr < 100 &&
      0 <= time.min &&
      time.min < 60 &&
      0 <= time.sec &&
      time.sec < 60
    ) {
      setTimeState(time);
    }
  };

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
            onPress={() => setDistance("5", "km")}
          />
          <DistanceButton
            distance={10}
            unit="km"
            onPress={() => setDistance("10", "km")}
          />
          <DistanceButton
            distance={15}
            unit="km"
            onPress={() => setDistance("15", "km")}
          />
          <DistanceButton
            distance={20}
            unit="km"
            onPress={() => setDistance("20", "km")}
          />
          <DistanceButton
            distance={13.1}
            unit="mi"
            onPress={() => setDistance("13.1", "mi")}
          />
          <DistanceButton
            distance={26.2}
            unit="mi"
            onPress={() => setDistance("26.2", "mi")}
          />
        </View>

        <DistanceInput
          distance={distanceStringToMiString(distance.label, distance.unit)}
          unit="mi"
          onChange={(distance: string) => {
            setDistance(distance, "mi");
          }}
        />

        <DistanceInput
          distance={distanceStringToKmString(distance.label, distance.unit)}
          unit="km"
          onChange={(distance: string) => {
            setDistance(distance, "km");
          }}
        />

        <Header title="Time" />

        <TimeInput time={time} onChange={(time) => setTime(time)} />

        <Header title="Pace" />

        <View style={styles.splitContainer}>
          <PaceBlock
            text={
              formatSecondsAsTime(
                secondsPerMile(
                  time,
                  distanceStringToKm(distance.label, distance.unit)
                )
              ) + " /mi"
            }
          />

          <PaceBlock
            text={
              formatSecondsAsTime(
                secondsPerKm(
                  time,
                  distanceStringToKm(distance.label, distance.unit)
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
                  time,
                  distanceStringToKm(distance.label, distance.unit)
                ),
                2
              ) + " mi/hr"
            }
          />

          <PaceBlock
            text={
              round(
                kmPerHour(
                  time,
                  distanceStringToKm(distance.label, distance.unit)
                ),
                2
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
                  time,
                  distanceStringToKm(distance.label, distance.unit)
                ) * 5
              )
            }
          />

          <SmallBlock
            text={
              "10 km: " +
              formatSecondsAsTime(
                secondsPerKm(
                  time,
                  distanceStringToKm(distance.label, distance.unit)
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
                  time,
                  distanceStringToKm(distance.label, distance.unit)
                ) * 15
              )
            }
          />

          <SmallBlock
            text={
              "20 km: " +
              formatSecondsAsTime(
                secondsPerKm(
                  time,
                  distanceStringToKm(distance.label, distance.unit)
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
                  time,
                  distanceStringToKm(distance.label, distance.unit)
                ) * 13.1
              )
            }
          />

          <SmallBlock
            text={
              "26.2 mi: " +
              formatSecondsAsTime(
                secondsPerMile(
                  time,
                  distanceStringToKm(distance.label, distance.unit)
                ) * 26.2
              )
            }
          />
        </View>
      </View>
    </ScrollView>
  );
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
    flexWrap: "wrap",
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
