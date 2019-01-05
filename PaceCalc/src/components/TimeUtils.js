/*
* @flow strict
*/
export type Time = {
  hr: number,
  min: number,
  sec: number
};

export function timeToSeconds(time: Time): number {
  return (time.hr * 60 + time.min) * 60 + time.sec;
}
