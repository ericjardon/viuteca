import logo from '../assets/logo.svg';
import './styles/App.scss';
import { Button } from 'reactstrap'
import { BrowserRouter as Router, Route, Switch, LinkProps, Link } from 'react-router-dom'
import NavHeader from './NavBar';
import Register from './Register';
import Projects from './Projects';

const notOnboarding = (path) => {
  return path !== '/login' && path != '/register';
}

function App() {

  return (
    <div className="App">
      <Router>
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Link
          to="/register"
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>
            Bootstrap component
          </Button>
        </Link>
      </header>
        WE CAN MAYBE USE THE SPINNING LOGO FOR OUR OWN?
      */}
        <Route render={({ location }) =>
          notOnboarding(location.pathname) ? <NavHeader /> : <></>} />

        <Switch>
          {/* Add routes here */}
        </Switch>
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/projects" render={() => <Projects />} />
      </Router>
    </div>
  );
}

export default App;
