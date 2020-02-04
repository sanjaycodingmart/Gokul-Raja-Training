import React from 'react';
import './App.css';
import * as ROUTES from './Components/Constants/routes';
import { Route,BrowserRouter as Router, Switch } from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation';
import Login from './Components/Login/Login';
import Challenge from './Components/Challenge/Challenge';

function App() {
  return (
  <Router>
  <Switch>
  <Route path={ROUTES.DASHBOARD} component={Navigation} />
  <Route path={ROUTES.LOGIN} component={Login} />
  <Route path={ROUTES.CHALLENGE} component={Challenge} />
  </Switch>

    </Router>
  );
}

export default App;
