import './styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavHeader from './NavBar';
import Register from './Register';
import VideosDisplay from './VideosDisplay';
import Testing from './Testing';
import Login from './Login'
import Home from './Home'
import Error404 from './404';
import NewVideo from './NewVideo'
import VideoDetail from './VideoDetail';
import Group from './GroupProfile';
import EditProfile from './EditProfile';
import { useState } from 'react'
import { QueryParamProvider } from 'use-query-params'
import WhatsappFooter from './WhatsappFooter';

function App() {

  return (
    <div className="App">
      <Router>
        {/* NAV BAR */}
        <QueryParamProvider ReactRouterRoute={Route}>
          <NavHeader/>
          
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/register" render={() => <Register />} />
            <Route exact path="/testing" render={() => <Testing />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route path="/videos" render={(props) => <VideosDisplay {...props} />} />
            <Route exact path="/video/:id" render={(props) => <VideoDetail {...props} />} />
            <Route exact path="/p/:id" render={(props) => <Group {...props}/>} />
            <Route exact path="/p/edit/:id" render={(props) => <EditProfile {...props}/>} />
            <Route exact path="/new-video" render={() => <NewVideo />} />
            <Route path="/*" render={() => <Error404/>}/>

          </Switch>

          <WhatsappFooter/>
        </QueryParamProvider>
      </Router>
    </div>
  );
}


export default App;
