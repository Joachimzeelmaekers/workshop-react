// import {render, screen} from '@testing-library/react';
// import Stopwatch from '../../components/Stopwatch';
import {render, screen} from '@testing-library/react';
import Stopwatch from '../../components/Stopwatch';

test('Renders start button', () => {
  render(<Stopwatch />);

  const startButton = screen.getByTestId('start-button');
  expect(startButton.textContent).toBe('Start');
});

const START_BUTTON_ID = 'start-button';
const STOP_BUTTON_ID = 'stop-button';
const LAP_BUTTON_ID = 'lap-button';
const LAPS_CONTAINER_ID = 'laps-container';

const pressStartButton = () => {
  const startButton = screen.getByTestId(START_BUTTON_ID);
  startButton.click();
};

const renderStopwatchComponent = () => {
  render(<Stopwatch />);
};

test('Renders stop and lap button only after pressing the start button', () => {
  renderStopwatchComponent();

  const stopButtonBeforeClick = screen.queryByTestId(STOP_BUTTON_ID);
  const lapButtonBeforeClick = screen.queryByTestId(LAP_BUTTON_ID);
  pressStartButton();
  const stopButtonAfterClick = screen.getByTestId(STOP_BUTTON_ID);
  const lapButtonAfterClick = screen.getByTestId(LAP_BUTTON_ID);

  expect(stopButtonBeforeClick).toBeNull();
  expect(lapButtonBeforeClick).toBeNull();
  expect(stopButtonAfterClick.textContent).toBe('Stop');
  expect(lapButtonAfterClick.textContent).toBe('Lap');
});

test('Renders laps children only when the lap button is pressed at least once', () => {
  renderStopwatchComponent();

  const lapsContainerBeforeClick = screen.queryByTestId(LAPS_CONTAINER_ID);
  expect(lapsContainerBeforeClick.childElementCount).toEqual(0);

  pressStartButton();
  const lapButton = screen.getByTestId(LAP_BUTTON_ID);

  expect(lapButton).toBeDefined();
  lapButton.click();

  const lapsContainerAfterClick = screen.queryByTestId(LAPS_CONTAINER_ID);
  expect(lapsContainerAfterClick.childElementCount).toEqual(1);
});
