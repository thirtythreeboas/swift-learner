export const convertTimeToString = (seconds: number) => {
  const mins: number = Math.floor(seconds / 60);
  const secs: number = seconds % 60;
  const time = `${mins <= 9 ? `0${mins}` : mins}:${
    secs <= 9 ? `0${secs}` : secs
  }`;
  return time;
};
