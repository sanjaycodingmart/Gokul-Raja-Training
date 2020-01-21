import React, { Component, Fragment } from 'react';
import { ChatBox } from 'react-chatbox-component';
import './groupchat.css';
import axios from 'axios'
export default class GroupChat extends Component{
    constructor(props){
        super(props);
        this.state={
            token:"",
            groupArray:[],
            sender:"",
            msg:"",
            userName:{}
        }
    }
async componentDidMount(){
    let token = await localStorage.getItem("token");
    let emailed = this.props.location.state.sender;
    let allUsers = this.props.location.state.allUsers;
    let values={}
    allUsers.map((value,index)=>{
        values[value.email]=value.title
    })
    await this.setState({
      token: token,
      sender:emailed,
      userName:values
    });
    this.getGroup();
}
getGroup = () => {
    let groupApi = new Promise(async (resolve, reject) => {
      let groupMsg = await axios.get("http://localhost:3005/group", {
        headers: { authorization: "Bearer " + this.state.token }
      });
      resolve(groupMsg);
    });
    groupApi.then(response => {
      let respObjArray = response.data.map((value, index) => {
        return {
          text: value.message,
          id:index,
          sender: {
            name: this.state.userName[value.email],
            uid: value.email
          }
        };
      });
      if(this.state.groupArray.length<respObjArray.length){
      this.setState({
        groupArray: respObjArray,
      });}
    });
  };
  handleMsg = event => this.setState({ msg: event.target.value });
  submit = () => {

    let requestedBody = {
      email: this.state.sender,
      message: this.state.msg
    };
    this.setState({
        msg:""
    })
    axios.post("http://localhost:3005/sendgroupmsg", requestedBody, {
      headers: { authorization: "Bearer " + this.state.token }
    });
    setTimeout(this.getGroup, 1000);
    setInterval(this.getGroup,5000);
  };
  
    render()
    {
        const user = {
            uid: this.state.sender
          };
        return(
            <Fragment>
            <div className="container">
                  <div className="chat-header"></div>
                  <ChatBox messages={this.state.groupArray} user={user} />
                </div>
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

            </Fragment>
        )
    }
}