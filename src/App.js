import {Route, Switch} from 'react-router-dom';

import './styles/app.scss';
import Clock from './components/Clock';
import Stopwatch from './components/Stopwatch';
import ShowsOverview from './pages/showsOverview/ShowsOverview';
import Nav from './components/Nav';
import ShowDetail from './pages/showsOverview/detailPage/ShowDetail';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/shows" component={Clock} />
        <Route path="/stopwatch" component={Stopwatch} />
        <Route path="/shows/:show_id" component={ShowDetail} />
        <Route exact path="/" component={ShowsOverview} />
      </Switch>
    </div>
  );
}

export default App;
