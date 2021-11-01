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
import { QueryParamProvider } from 'use-query-params'

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
        {/* NAV BAR */}
        <QueryParamProvider ReactRouterRoute={Route}>
          <NavHeader submitSearch={submitSearch} />
          
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/register" render={() => <Register />} />
            <Route exact path="/testing" render={() => <Testing />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route path="/videos" render={(props) => <VideosDisplay search={currentSearch} {...props} />} />
            <Route exact path="/video/:id" render={(props) => <VideoDetail {...props} />} />
            <Route exact path="/new-video" render={() => <VideoForm />} />
          </Switch>
        </QueryParamProvider>
      </Router>
    </div>
  );
}

const showHeader = (path) => {
  return path !== '/login' && path !== '/register';
}

export default App;
