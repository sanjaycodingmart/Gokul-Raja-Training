import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import SignIn from './SignIn'
import Navigation from './Navigation';
import * as ROUTES from '../Constants/routes';
import TableHeaders from './GetTableHeadings';
import UserTables from './UserTables'


const App = () => (
  <Router>
  <div>
    <Navigation />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.HOME} component={UserTables} />
      <Route path={ROUTES.ACCOUNT} component={TableHeaders} />
 </div> 
 </Router>
);
export default App;
