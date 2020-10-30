import React, {useState, useEffect, useRef} from 'react'
import Timer from './Timer'

const INTERVAL = 10

function Stopwatch() {
  const [timeStarted, setTimeStarted] = useState()
  const [currentTime, setCurrentTime] = useState()

  const [isStarted, setIsStarted] = useState(false)

  const [savedCurrentTime, setSavedCurrentTime] = useState()
  const [savedTimeStarted, setSavedTimeStarted] = useState()

  const timerRef = useRef()

  useEffect(() => {
    if (isStarted) {
      if (savedCurrentTime) {
        setTimeStarted(savedTimeStarted)
      } else {
        setTimeStarted(new Date())
      }
      timerRef.current = setInterval(() => {
        if (savedCurrentTime) {
          const milliSeconds = savedCurrentTime.getMilliseconds()
          setCurrentTime(
            new Date(savedCurrentTime.setMilliseconds(milliSeconds + INTERVAL)),
          )
        } else {
          setCurrentTime(new Date())
        }
      }, INTERVAL)

      return () => {
        clearInterval(timerRef.current)
      }
    }
  }, [
    isStarted,
    savedTimeStarted,
    savedCurrentTime,
    setSavedCurrentTime,
    setSavedTimeStarted,
  ])

  const toggleIsStarted = () => {
    setIsStarted(!isStarted)
  }

  const stopTimer = () => {
    setIsStarted(false)
    setSavedCurrentTime(currentTime)
    setSavedTimeStarted(timeStarted)
  }

  return (
    <div>
      {!isStarted ? (
        <button
          className="m-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleIsStarted}
        >
          Start timer
        </button>
      ) : (
        <button
          className="m-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={stopTimer}
        >
          Stop timer
        </button>
      )}

      <button className="m-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        reset timer
      </button>
      <button className="m-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Lap
      </button>
      <Timer
        timeStarted={isStarted ? timeStarted : savedTimeStarted}
        currentTime={isStarted ? currentTime : savedCurrentTime}
      />
    </div>
  )
}

export default Stopwatch
