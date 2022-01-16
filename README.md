# Quick Pace Calc

This app allows you to quickly determine your proportional race times based on your run distance and time. Simply enter the time and distance you ran then automatically see what a proportional time would be for common race distances like 5km, 10km, 15km, 20km, 13.1 mi, and 26.2 mi. In addition, it will automatically show your min/mi, min/km, mi/hr, and km/hr.

## Getting Started

Open the PaceCalc directory and run `npm start` to start the expo server

## Building for production

See https://docs.expo.io/versions/latest/distribution/building-standalone-apps.html

Tips: If testing the compiled app in the iOS simulator make sure to include the '.app' extension when installing the app.
e.g. This will fail:
`xcrun simctl install booted pace-calc`
but this will work:
`xcrun simctl install booted pace-calc.app`

To upload to apple for submission:

- https://docs.expo.dev/build/automating-submissions/
  `eas build -p ios --profile production --auto-submit`

1. Open XCode
2. XCode > Open Developer Tool > Application Loader

## Building for simulator

- https://docs.expo.dev/build-reference/simulators/

```
cd PaceCalc
eas build -p ios --profile preview
```
