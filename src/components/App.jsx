//import logo from '../assets/logo.svg';
import './styles/App.scss';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavHeader from './NavBar';
import Register from './Register';
import Projects from './Projects';
import Testing from './Testing';
import Login from './Login'
import Home from './Home'
import VideoForm from './VideoForm'
import VideoDetail from './VideoDetail';

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
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/testing" render={() => <Testing />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/projects" render={() => <Projects />} />
        <Route exact path="/video/:id" render={(props) => <VideoDetail {...props} />} />
        <Route exact path="/newVideo" render={() => <VideoForm/>}/>
      </Router>
    </div>
  );
}

const notOnboarding = (path) => {
  return path !== '/login' && path !== '/register';
}

export default App;
