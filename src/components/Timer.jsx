import React from 'react'

function msToTime(duration) {
  let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60)

  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return `${minutes}:${seconds}:${milliseconds}`
}

function Timer({timeStarted, currentTime}) {
  if (!timeStarted || !currentTime) {
    return null
  }

  const diffTime = Math.abs(currentTime - timeStarted)

  return <div>{msToTime(diffTime)}</div>
}

export default Timer
