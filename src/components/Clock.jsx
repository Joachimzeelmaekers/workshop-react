import React, {useState, useEffect, useRef} from 'react'

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const clockRef = useRef()

  useEffect(() => {
    clockRef.current = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(clockRef.current)
    }
  }, [])

  const seconds = currentTime.getSeconds()
  const minutes = currentTime.getMinutes()
  const hours = currentTime.getHours()

  const secondsStyle = {
    transform: `rotate(${seconds * 6}deg)`,
  }
  const minutesStyle = {
    transform: `rotate(${minutes * 6}deg)`,
  }
  const hoursStyle = {
    transform: `rotate(${hours * 30}deg)`,
  }

  const padNumbers = (number) => {
    if (number > 9) {
      return number
    }
    return `0${number}`
  }

  return (
    <div className="clock">
      <div className="outer-clock-face">
        <div className="marking marking-one"></div>
        <div className="marking marking-two"></div>
        <div className="marking marking-three"></div>
        <div className="marking marking-four"></div>
        <div className="inner-clock-face">
          <div className="hand hour-hand" style={hoursStyle}></div>
          <div className="hand min-hand" style={minutesStyle}></div>
          <div className="hand second-hand" style={secondsStyle}></div>
        </div>
      </div>
    </div>
  )
}

export default Clock
