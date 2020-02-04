import React, { Component, Fragment } from 'react';
import * as ROUTES from '../Constants/routes';
import axios from 'axios';
import './navigation.css'
import Navigated from './Navigate'
export default class Navigation extends Component{
    constructor(props){
        super(props);
        this.state={
            channels:[],
            showChannel:false,
            msg:"",
            currentChannelId:""
        }
    }
   componentDidMount=async()=>{
       if(localStorage.getItem("token").length===0){
        let access_token=null;
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const code = params.get("code");
        localStorage.setItem("code",code)
        let getAccessToken =await axios.get("https://slack.com/api/oauth.access",{
            params:{
              client_id:ROUTES.CLIENT_ID,
              client_secret:ROUTES.CLIENT_SECRET,
              code:localStorage.getItem("code")
            }
          })
          console.log(getAccessToken)
         
              access_token=getAccessToken.data.access_token;
            localStorage.setItem("token",access_token)
       }
       else{
        let channelList = await axios.get("https://slack.com/api/channels.list",{
            params:{
                token:localStorage.getItem("token")
            }
        })
        
            this.setState({
                channels:channelList.data.channels
            })
            console.log(channelList)
       }
        
          
         
          

    }
    handleMsg =(e)=>{
        e.preventDefault()
        this.setState({
            msg:e.target.value
        })
    }
    getMessages =async(id)=>{
        this.setState({
            currentChannelId:id
        })
        
        let getChannelMessages=await axios.get("https://slack.com/api/conversations.history",{
            params:{
                token:localStorage.getItem("token"),
                channel:id
            }
        })
        
        
        console.log(getChannelMessages)
        let channelArray=getChannelMessages.data.messages.map((value,index)=>{
            
                    return({
                        "text":value.text.split(":")[0],
                        "id":value.ts,
                        "sender": {
                            "uid":value.ts
                            // "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
                          }
                    })
        })
        this.setState({
            channelMessage:channelArray,
            showChannel:true
        })
    }
    submit =async()=>{
        let token=localStorage.getItem("token")
        const config = {
            headers: { 
                "Authorization": "Bearer "+token
        }
        };
        const bodyParameters = {
            channel: this.state.currentChannelId,
                text: this.state.msg
         };
        axios.post("https://slack.com/api/chat.postMessage",bodyParameters,
        config).then((resp)=>{
            if(resp.data.ok){
                    this.getMessages(this.state.currentChannelId    )
            }
        })
        this.setState({
            msg:""
        })
    }
    render(){
          const user = {
            "uid" : "user1"
          }
        return(
            <Fragment>


            <Navigated channels={this.state.channels}/>
                {/* <h1>Hello Dashboard</h1>
                <div>
                    <ul>
                        {this.state.channels && this.state.channels.map((value,index)=>(
                            <div onClick={()=>this.getMessages(value.id)}><li>{value.name}</li></div>
                        ))}
                    </ul>
                </div> */}
                {/* {this.state.showChannel && 
                    <div className='container' style={{maxWidth: '800px', paddingTop: '100px'}}>
      <div className='chat-header'>
      </div>
      <ChatBox 
        messages={this.state.channelMessage} 
        user={user} />
    </div>} */}





    {/* {this.state.showChannel &&
    <div className="message-footer">
          <div className="msg-form">
            <div className="inputs">
              <input
                type="text"
                className="control msg-input"
                onChange={this.handleMsg}
                value={this.state.msg}
                placeholder="Type something"
                required="true"
              />
              <button onClick={this.submit}>Send Message</button>
            </div>
          </div>
        </div>
                } */}
                
            </Fragment>
        )
    }
}