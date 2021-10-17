import logo from '../assets/logo.svg';
import './styles/App.scss';
import {Button} from 'reactstrap'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>
            Bootstrap component
          </Button>
        </a>
      </header>
      <NavBar/>
      <Switch>
      {/* Add routes here */}
      </Switch>
        <Route exact path="/index">Index</Route>

      </Router>
    </div>
  );
}

export default App;
