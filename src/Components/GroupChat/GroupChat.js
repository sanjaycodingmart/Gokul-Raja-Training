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
            msg:""
        }
    }
async componentDidMount(){
    let token = await localStorage.getItem("token");
    let emailed = window.location.href.substring(37);

    await this.setState({
      token: token,
      sender:emailed
    });
    this.getGroup();
}
getGroup = () => {
    let groupApi = new Promise(async (resolve, reject) => {
      let groupMsg = await axios.get("http://localhost:3005/group", {
        headers: { authorization: "Bearer " + this.state.token }
      });
      resolve(groupMsg);
      console.log("APi", groupMsg);
    });
    groupApi.then(response => {
      console.log(response);
      let respObjArray = response.data.map((value, index) => {
        return {
          text: value.message,
          id:index,
          sender: {
            name: value.email,
            uid: value.email
          }
        };
      });
      this.setState({
        groupArray: respObjArray,
      });
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