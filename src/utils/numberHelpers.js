/**
 * @param duration: number
 * @returns a duration in the format 00 of type string.
 */
export function padNumbers(number) {
  if (number > 9) {
    return number;
  }
  return `0${number}`;
}

/**
 * @param duration: number
 * @returns the milliseconds in the format 00:00:00 of type string.
 */
export function msToTime(duration) {
  let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60);

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${minutes}:${seconds}:${padNumbers(milliseconds)}`;
}
/**
 * @param newestDate: Date
 * @param oldestDate: Date
 * @returns the diff between the 2 dates in milliseconds.
 */
export function subtractDates(newestDate, oldestDate) {
  return Math.abs(oldestDate - newestDate);
}
