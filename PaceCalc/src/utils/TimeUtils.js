/*
 * @flow strict
 */

import { kmToMiles } from "./DistanceUtils";

export type Time = {
  hr: number,
  min: number,
  sec: number,
};

export function secondsPerKm(time: Time, distanceInKm: number): number {
  totalSeconds = timeToSeconds(time);
  return distanceInKm > 0 ? totalSeconds / distanceInKm : 0;
}

export function secondsPerMile(time: Time, distanceInKm: number): number {
  totalSeconds = timeToSeconds(time);
  return distanceInKm > 0 ? totalSeconds / kmToMiles(distanceInKm) : 0;
}

export function kmPerHour(time: Time, distanceInKm: number): number {
  totalSeconds = timeToSeconds(time);
  hours = (totalSeconds * 1.0) / (60 * 60);
  return hours > 0 ? distanceInKm / hours : 0;
}

export function milesPerHour(time: Time, distanceInKm: number): number {
  totalSeconds = timeToSeconds(time);
  hours = (totalSeconds * 1.0) / (60 * 60);
  return hours > 0 ? kmToMiles(distanceInKm) / hours : 0;
}

function timeToSeconds(time: Time): number {
  return (time.hr * 60 + time.min) * 60 + time.sec;
}

export function formatSecondsAsTime(seconds: number): string {
  hours = secondsToHours(seconds);
  secondsRemaining = seconds - hours * 60 * 60;
  minutes = secondsToMinutes(secondsRemaining);
  seconds = Math.round(secondsRemaining - minutes * 60);
  return formatTime(seconds, minutes, hours);
}

function secondsToHours(seconds: number): number {
  return Math.trunc(seconds / (60 * 60));
}

function secondsToMinutes(seconds: number): number {
  return Math.trunc(seconds / 60);
}

function formatTime(sec: ?number, min: ?number, hr: ?number): string {
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
