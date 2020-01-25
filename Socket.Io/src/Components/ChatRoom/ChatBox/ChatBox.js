import 'react-chatbox-component/dist/style.css';
import React, { Component, Fragment } from 'react';
import {ChatBox} from 'react-chatbox-component';
const ChatBoxed = ()=>{
  const messages = [
    {
      "text": "Hello there",
      "id": "1",
      "sender": {
        "name": "Ironman",
        "uid": "user1",
      },
    },
    {
      "text": "Hello there",
      "id": "1",
      "sender": {
        "name": "Ironman",
        "uid": "user2",
      },
    },
    {
      "text": "Hello there",
      "id": "1",
      "sender": {
        "name": "Ironman",
        "uid": "user2",
      },
    },
  ]
  const user = {
  "uid" : "user1"
}
   return(
     <Fragment>
  <div className='container'>
  <div className='chat-header'>
    <h5>React Chat Box Example</h5>
  </div>
  <ChatBox
  messages={messages}
  user={user}
/>
</div>
  </Fragment>
   )
  
}
export default ChatBoxed;