import React, {useState, useEffect, useRef} from 'react'

const Clock = () => {
  const title = 'Clocky'
  const [currentTime, setCurrentTime] = useState(new Date())
  const clockRef = useRef()

  useEffect(() => {
    setInterval(() => {
      clockRef.current = setCurrentTime(new Date())
    }, 1000)

    return () => {
      clockRef.current?.clearInterval()
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
    <div className={'clock'}>
      <h3>{title}</h3>
      <div className={'analog-clock'}>
        <div className={'clock-circle'}></div>
        <div className={'dial seconds'} style={secondsStyle} />
        <div className={'dial minutes'} style={minutesStyle} />
        <div className={'dial hours'} style={hoursStyle} />
      </div>
      <div className={'digital-clock'}>
        {hours}:{padNumbers(minutes)}:{padNumbers(seconds)}
      </div>
    </div>
  )
}

export default Clock
