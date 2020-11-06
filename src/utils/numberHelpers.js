export function padNumbers(number) {
  if (number > 9) {
    return number;
  }
  return `0${number}`;
}

export function msToTime(duration) {
  let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60);

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${minutes}:${seconds}:${padNumbers(milliseconds)}`;
}
