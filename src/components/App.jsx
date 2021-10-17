import logo from '../assets/logo.svg';
import './styles/App.scss';
import {Button} from 'reactstrap'
import {BrowserRouter as Router, Route, Switch, LinkProps, Link} from 'react-router-dom'
import NavBar from './NavBar';
import Register from './Register';

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
      <NavBar/>
      <Switch>
      {/* Add routes here */}
      </Switch>
        <Route exact path="/register" render={()=><Register/>}/>

      </Router>
    </div>
  );
}

export default App;
