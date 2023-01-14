/**
 * @returns time string calculated with respect to timezone offset
 */
export const getTimeString = (
  timestampInSeconds: number,
  timezoneOffsetInSeconds: number
) => {
  const localTimezoneOffsetMs = new Date().getTimezoneOffset() * 60 * 1000;
  const timezoneOffsetMs = timezoneOffsetInSeconds * 1000;
  const date = new Date(
    timestampInSeconds * 1000 + localTimezoneOffsetMs + timezoneOffsetMs
  );

  return date.toLocaleTimeString(navigator.language, {
    timeStyle: "short",
  });
};
