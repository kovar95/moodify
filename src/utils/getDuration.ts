export const getDuration = (durationInSeconds?: number) => {
  if (!durationInSeconds) {
    return "00 : 00";
  }

  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  const hoursFormatted =
    hours > 0 ? `${hours > 9 ? hours : `0${hours}`} : ` : "";
  const minutesFormatted =
    minutes > 0 ? `${minutes > 9 ? minutes : `0${minutes}`} : ` : "00 : ";
  const secondsFormatted =
    seconds > 0 ? `${seconds > 9 ? seconds : `0${seconds}`}` : "00";

  return `${hoursFormatted}${minutesFormatted}${secondsFormatted}`;
};
