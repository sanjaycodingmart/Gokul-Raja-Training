import React , {Fragment} from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../Constants/routes';
import './header.css';
const Navigation = () => (
    <Fragment>
    <div className="header-container">
      <div className="flex-container">
        <div className="signIn">
    <ul>
    <li>
                  <a className="active" href="#home">
                    MartSheet
                  </a>
                </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Log Out</Link>
      </li>
      
    </ul> 
  </div>
  </div>
  </div>
  </Fragment>
);
export default Navigation;