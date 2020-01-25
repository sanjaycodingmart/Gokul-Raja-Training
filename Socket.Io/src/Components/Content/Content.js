import React, { Fragment } from 'react';
import './content.css';
import logo from './logo.png';
const Content = () =>{
    return(
        <Fragment>
            <div className="flip-card">
  <div className="flip-card-inner">
    <div className="flip-card-front">
      <img src={logo} alt="Avatar" className="images"/>
    </div>
    <div className="flip-card-back">
      <h1>Go-Chat</h1> 
      <p>Where all the Work Begin</p> 
      <p>Sign In and Explore More</p>
    </div>
  </div>
</div>
        </Fragment>
    )
}
export default Content;