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

export function distanceStringToKm(
  distance: string,
  unit: "km" | "mi"
): number {
  return Number(distanceStringToKmString(distance, unit));
}

export function distanceStringToKmString(
  distance: string,
  unit: "km" | "mi"
): string {
  if (unit === "km") {
    return distance;
  }
  return round(milesToKm(Number(distance)), 2).toString();
}

export function distanceStringToMiString(
  distance: string,
  unit: "km" | "mi"
): string {
  if (unit === "mi") {
    return distance;
  }
  return round(kmToMiles(Number(distance)), 2).toString();
}
