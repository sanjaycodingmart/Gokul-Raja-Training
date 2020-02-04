import React, {  Fragment } from 'react';
import logo from './slack-new-logo.svg';
export default function Login (){
return(
    <Fragment>
         <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br/>
        <a href="https://slack.com/oauth/authorize?scope=incoming-webhook,commands,bot,users:read,channels:read,channels:history,files:write:user,chat:write:user&client_id=926900497861.915430479171"><img src="https://api.slack.com/img/sign_in_with_slack.png" /></a>
      </header>
      
    </div>
    </Fragment>
)
}