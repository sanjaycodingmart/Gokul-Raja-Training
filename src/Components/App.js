import React from 'react';

import './App.css';
import SignIn from './SignIn';
import {BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom';
import DashBoard from './DashBoard';
import Favourite from './Favourite';
import DocumentAbstract from './DocumentAbstract';
import Header from './Header';

function App() {
  return (
    <Router>
      <Header/>
      <div className="App">
      <Switch>
      <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/dashboard" component={DashBoard}/>
        <Route exact path="/favourites" component={Favourite} />
        <Route exact path="/documents" component={DocumentAbstract} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
