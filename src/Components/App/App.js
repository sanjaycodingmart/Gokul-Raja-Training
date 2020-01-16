import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChatBoxed from '../ChatRoom/ChatBox/ChatBox';
import ChatTv from '../ChatRoom/ChatTv/ChatTv';
import * as ROUTES from '../Constants/routes';
import Navigation from '../Navigation/Navigation';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import './App.css';
import GroupChat from '../GroupChat/GroupChat';

class App  extends Component{
  constructor(props){
    super(props);
    this.state={
      logged:false,
      
    }
  }
 
  render()
  {
  return(<Router>
  <div>
    <Navigation logged={this.state.logged}/>
    
    {/* <ChatBox/> */}
    {/* <Route path="/" component={Content} /> */}
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.HOME} component={SignIn} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.CHAT_TV} component={ChatTv} />
      <Route path={ROUTES.CHAT_BOX} component={ChatBoxed} />
      <Route path={ROUTES.GRP_CHAT} component={GroupChat} />
      
  
 </div> 
 </Router>
 )
}
}
export default App;
