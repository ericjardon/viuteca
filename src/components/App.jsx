import './styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavHeader from './NavBar';
import Register from './Register';
import VideosDisplay from './VideosDisplay';
import Testing from './Testing';
import Login from './Login'
import Home from './Home'
import VideoForm from './VideoForm'
import VideoDetail from './VideoDetail';
import { useState } from 'react'

function App() {

  const [currentSearch, setCurrentSearch] = useState(null);

  const submitSearch = (searchType, searchTerm) => {
    console.log("Submitting search:", searchType, searchTerm);

    if (searchTerm.trim() === "") {
      setCurrentSearch(null);
      return;
    }
    setCurrentSearch([searchType, searchTerm]);
  }

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
        <Route path="/" render={({ location }) =>
          showHeader(location.pathname) ? <NavHeader submitSearch={submitSearch} /> : <></>} />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/register" render={() => <Register />} />
          <Route path="/testing" render={() => <Testing />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/videos" render={(props) => <VideosDisplay search={currentSearch} {...props}/> } />
          <Route path="/video/:id" render={(props) => <VideoDetail {...props} />} />
          <Route path="/newVideo" render={() => <VideoForm />} />
        </Switch>
      </Router>
    </div>
  );
}

const showHeader = (path) => {
  console.log("Show header?", path !== '/login' && path !== '/register')
  return path !== '/login' && path !== '/register';
}

export default App;
