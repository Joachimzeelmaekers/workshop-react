import React from 'react';

const LAP_STYLE = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '200px',
  padding: '0.2em',
};

function Lap({lap}) {
  if (!lap) {
    return 'Lap is undefined.';
  }

  return (
    <div style={LAP_STYLE}>
      <p>Lap {lap.number}</p>
      <p>{lap.value}</p>
    </div>
  );
}

export default Lap;
