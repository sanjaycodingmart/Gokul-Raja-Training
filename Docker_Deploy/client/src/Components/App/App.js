import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChatBoxed from '../ChatRoom/ChatBox/ChatBox';
import ChatTv from '../ChatRoom/ChatTv/ChatTv';
import * as ROUTES from '../Constants/routes';
import Navigation from '../Navigation/Navigation';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import './App.css';
import GroupChat from '../GroupChat/GroupChat';
import CoupleChat from '../CoupleChat/couplechat';
import Content from '../Content/Content'
import About from '../Profile/about';
import CreateGroupChat from '../CreateGroupChat/creategroup';
class App  extends Component{
  constructor(props){
    super(props);
    this.state={
      logged:false,
      endpoint: "http://127.0.0.1:4001"
      
    }
  }
  componentDidMount(){
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("app",(data)=>{
      console.log(data)
    })
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
      <Route path={ROUTES.NAV} component={Navigation} />
      <Route path={ROUTES.SOLO} component={CoupleChat}/>
      <Route path={ROUTES.PROFILE} component={About}/>
      <Route path={ROUTES.CREATE_GROUP} component={CreateGroupChat}/>
  
 </div> 
 </Router>
 )
}
}
export default App;
