import React from 'react';
import {msToTime} from '../utils/numberHelpers.js';

const timerStyle = {
  color: '#555',
  fontSize: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function Timer({timeStarted, currentTime}) {
  if (!timeStarted || !currentTime) {
    return <div style={timerStyle}>00:00:00</div>;
  }

  const diffTime = Math.abs(currentTime - timeStarted);

  return <div style={timerStyle}>{msToTime(diffTime)}</div>;
}

export default Timer;
