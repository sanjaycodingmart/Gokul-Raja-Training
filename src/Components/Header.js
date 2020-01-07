import React, { Fragment } from 'react';
import './header.css';
import {Link} from 'react-router-dom';
// import logo from './logo.svg';
import { Wave } from 'react-animated-text';
export default function Header(props){
    return(
        <Fragment>
            <header className="header-container">
                
                <ul>
                    
                    <li><h1>
                    <Wave text="Article Search" effect="stretch"
  effectChange="2"/></h1>
  </li>
  {/* <div><img src={logo} className="App-logo" alt="logo" style={imgStyle} /></div> */}
                </ul>
                <Link to="/signin">
         <div className="signIn">Sign In / Sign  Up</div> 
        </Link>
                
            </header>
        </Fragment>
    )
}