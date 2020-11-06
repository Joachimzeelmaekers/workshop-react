import './styles/app.scss';
import Clock from './components/Clock';
import Stopwatch from './components/Stopwatch';
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Clock} />
        <Route path="/stopwatch" component={Stopwatch} />
      </Switch>
    </div>
  );
}

export default App;
