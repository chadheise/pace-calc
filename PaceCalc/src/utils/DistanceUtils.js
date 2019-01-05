/*
* @flow strict
*/
const KM_PER_MILE = 1.609344;

export function kmToMiles(distanceInKm: number): number {
  return distanceInKm / KM_PER_MILE;
}

export function milesToKm(distanceInMiles: number): number {
  return distanceInMiles * KM_PER_MILE;
}

export function round(value: number, decimalPlaces: number) {
  return (
    Math.round(value * Math.pow(10, decimalPlaces)) /
    Math.pow(10, decimalPlaces)
  );
}
