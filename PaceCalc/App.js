import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";

import DistanceButton from "./src/components/DistanceButton";
import DistanceInput from "./src/components/DistanceInput";
import Header from "./src/components/Header";
import PaceBlock from "./src/components/PaceBlock";
import SmallBlock from "./src/components/SmallBlock";
import TimeInput from "./src/components/TimeInput";

import type Time from "./src/utils/TimeUtils";

import {kmToMiles, milesToKm, round} from "./src/utils/DistanceUtils";
import {timeToSeconds, secondsToMinutes, formatTime} from "./src/utils/TimeUtils";
import {colors} from "./src/utils/styles";

type Props = {};

type State = {
  distance: number, // Always stored in km
  time: Time
};

export default class App extends Component<Props, State> {
  state = {
    distance: 1.609344,
    time: {
      hr: 0,
      min: 0,
      sec: 0
    }
  };

  render() {
    return (
      <ScrollView bounces={false} style={styles.scrollView}>
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
          onChange={num => {
            this._setDistance(num, "mi");
          }}
        />

        <DistanceInput
          distance={round(this.state.distance, 2)}
          unit="km"
          onChange={num => {
            this._setDistance(num, "km");
          }}
        />

        <Header title="Time" />

        <TimeInput
          time={this.state.time}
          onChange={time => this._setTime(time)}
        />

        <Header title="Pace" />

        <View style={styles.splitContainer}>
          <PaceBlock
            text={this._formatSecondsAsTime(this._secondsPerMile()) + " /mi"}
          />

          <PaceBlock
            text={this._formatSecondsAsTime(this._secondsPerKm()) + " /km"}
          />
        </View>

        <View style={styles.splitContainer}>
          <PaceBlock text={round(this._milesPerHour(), 3) + " mi/hr"} />

          <PaceBlock text={round(this._kmPerHour(), 3) + " km/hr"} />
        </View>

        <Header title="Proportional Race Times" />

        <View style={styles.splitContainer}>
          <SmallBlock
            text={
              "5 km: " + this._formatSecondsAsTime(this._secondsPerKm() * 5)
            }
          />

          <SmallBlock
            text={
              "10 km: " + this._formatSecondsAsTime(this._secondsPerKm() * 10)
            }
          />
        </View>

        <View style={styles.splitContainer}>
          <SmallBlock
            text={
              "15 km: " + this._formatSecondsAsTime(this._secondsPerKm() * 15)
            }
          />

          <SmallBlock
            text={
              "20 km: " + this._formatSecondsAsTime(this._secondsPerKm() * 20)
            }
          />
        </View>

        <View style={styles.splitContainer}>
          <SmallBlock
            text={
              "13.1 mi: " +
              this._formatSecondsAsTime(this._secondsPerMile() * 13.1)
            }
          />

          <SmallBlock
            text={
              "26.2 mi: " +
              this._formatSecondsAsTime(this._secondsPerMile() * 26.2)
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
    if (distance < 16093.45) { // Max input allowed is 10000 mi
      this.setState({
        distance: distance
      });
    }
  };

  _setTime(time: Time) {
    if (0 <= time.hr && time.hr < 100 && 
      0 <= time.min && time.min < 60 &&
      0 <= time.sec && time.sec < 60) {
        this.setState({
          time: time
        });
    }
  }

  _secondsPerKm(): number {
    totalSeconds = timeToSeconds(this.state.time);
    return this.state.distance > 0 ? totalSeconds / this.state.distance : 0;
  }

  _secondsPerMile(): number {
    totalSeconds = timeToSeconds(this.state.time);
    return this.state.distance > 0 ? totalSeconds / kmToMiles(this.state.distance) : 0;
  }

  _kmPerHour(): number {
    totalSeconds = timeToSeconds(this.state.time);
    hours = (totalSeconds * 1.0) / (60 * 60);
    return hours > 0 ? this.state.distance / hours : 0;
  }

  _milesPerHour(): number {
    totalSeconds = timeToSeconds(this.state.time);
    hours = (totalSeconds * 1.0) / (60 * 60);
    return hours > 0 ? kmToMiles(this.state.distance) / hours : 0;
  }

  // TODO: move this to TimeUtils.js
  _secondsToHours(seconds: number): number {
    return Math.trunc(seconds / (60 * 60));
  }

  // TODO: move to TimeUtils.js
  _secondsToMinutes(seconds: number): number {
    return Math.trunc(seconds / 60);
  }

  // TODO: move to TimeUtils.js
  _formatTime(sec: ?number, min: ?number, hr: ?number): string {
    if (hr) {
      if (min < 10) {
        min = "0" + min.toString();
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      return hr + ":" + min + ":" + sec;
    } else if (min) {
      if (min < 10) {
        min = "0" + min.toString();
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      return min + ":" + sec;
    }

    if (sec < 10) {
      sec = "0" + sec;
    }
    return sec + " sec";
  }

  _formatSecondsAsTime(seconds: number): string {
    hours = this._secondsToHours(seconds);
    secondsRemaining = seconds - hours * 60 * 60;
    minutes = this._secondsToMinutes(secondsRemaining);
    seconds = Math.round(secondsRemaining - minutes * 60);
    return this._formatTime(seconds, minutes, hours);
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
    paddingRight: 10
  },
  distanceButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  scrollView: {
    backgroundColor: colors.background,
  },
  splitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  }
});
