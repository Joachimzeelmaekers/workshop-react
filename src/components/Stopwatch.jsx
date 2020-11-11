import React, {useState, useEffect, useRef, useMemo} from 'react';
import {msToTime, subtractDates} from '../utils/numberHelpers';
import Lap from './Lap';
import Timer from './Timer';

const INTERVAL = 10;

function Stopwatch() {
  const [timeStarted, setTimeStarted] = useState();
  const [currentTime, setCurrentTime] = useState();

  const [isStarted, setIsStarted] = useState(false);

  const [savedCurrentTime, setSavedCurrentTime] = useState();
  const [savedTimeStarted, setSavedTimeStarted] = useState();

  const [savedLaps, setSavedLaps] = useState([]);

  const timerRef = useRef();

  useEffect(() => {
    if (isStarted) {
      if (savedCurrentTime) {
        setTimeStarted(savedTimeStarted);
      } else {
        setTimeStarted(new Date());
      }
      timerRef.current = setInterval(() => {
        if (savedCurrentTime) {
          const milliSeconds = savedCurrentTime.getMilliseconds();
          setCurrentTime(
            new Date(savedCurrentTime.setMilliseconds(milliSeconds + INTERVAL)),
          );
        } else {
          setCurrentTime(new Date());
        }
      }, INTERVAL);

      return () => {
        clearInterval(timerRef.current);
      };
    }
  }, [
    isStarted,
    savedTimeStarted,
    savedCurrentTime,
    setSavedCurrentTime,
    setSavedTimeStarted,
  ]);

  const laps = useMemo(() => {
    return savedLaps
      .map((savedLap, index) => {
        const {timePressed, timeStarted} = savedLap || {};
        const diffTime = subtractDates(timePressed, timeStarted);
        return {value: msToTime(diffTime), number: index + 1};
      })
      .reverse();
  }, [savedLaps]);

  const toggleIsStarted = () => {
    setIsStarted(!isStarted);
  };

  const resetTimer = () => {
    setCurrentTime(null);
    setSavedCurrentTime(null);
    setSavedTimeStarted(null);
    setSavedLaps([]);
  };

  const stopTimer = () => {
    setIsStarted(false);
    setSavedCurrentTime(currentTime);
    setSavedTimeStarted(timeStarted);
  };

  const saveLap = () => {
    setSavedLaps((prevState) => [
      ...prevState,
      {
        timePressed: currentTime,
        timeStarted,
      },
    ]);
  };

  return (
    <div className="page-container">
      <div
        data-testid="stopwatch"
        style={{display: 'flex', justifyContent: 'space-between', width: '50%'}}
      >
        <div style={{display: 'flex', flexDirection: 'column', width: '200px'}}>
          <Timer
            timeStarted={isStarted ? timeStarted : savedTimeStarted}
            currentTime={isStarted ? currentTime : savedCurrentTime}
          />
          <div className="button-container">
            {!isStarted ? (
              <button
                className="m-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={toggleIsStarted}
                data-testid="start-button"
              >
                Start
              </button>
            ) : (
              <>
                <button
                  className="m-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={stopTimer}
                  data-testid="stop-button"
                >
                  Stop
                </button>
                <button
                  className="m-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={saveLap}
                  data-testid="lap-button"
                >
                  Lap
                </button>
              </>
            )}
            {!isStarted && savedCurrentTime ? (
              <button
                className="m-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={resetTimer}
              >
                Reset
              </button>
            ) : null}
          </div>
        </div>
        <div data-testid="laps-container" style={{height: '200px'}}>
          {laps.map((lap) => {
            return <Lap lap={lap} key={`lap-${lap.number}`} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
