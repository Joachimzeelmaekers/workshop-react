import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import App from '../App';

const renderWithRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, {wrapper: BrowserRouter});
};

test('renders the clock component on the base route', () => {
  renderWithRouter(<App />);

  const clockComponent = screen.getByTestId('clock');
  expect(clockComponent).toBeInTheDocument();
});

test('renders the stopwatch component on the /stopwatch route', () => {
  renderWithRouter(<App />, {route: '/stopwatch'});
  const stopwatchComponent = screen.getByTestId('stopwatch');
  expect(stopwatchComponent).toBeInTheDocument();
});
