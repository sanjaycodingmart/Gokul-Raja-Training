import React, { Component, Fragment } from "react";
import { ChatBox } from "react-chatbox-component";
import "./groupchat.css";
import axios from "axios";
import socketIOClient from "socket.io-client";
import io from "socket.io-client";

export default class GroupChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      groupArray: [],
      sender: "",
      msg: "",
      userName: {}
    };
    this.socket = io.connect("http://localhost:4001/group");
    this.socket.on("group message", data => {
      this.setState({
        groupArray: [...this.state.groupArray, data]
      });
    });
  }
  getUrl = async user => {
    let url = await axios.get("http://localhost:4001/geturl", {
      params: {
        user: user
      }
    });
    return url.data.url;
    // url.then((resp)=>{
    //   return resp[0].url
    // });
  };
  async componentDidMount() {
    let token = await localStorage.getItem("token");
    let emailed = this.props.location.state.sender;
    let allUsers = this.props.location.state.allUsers;
    console.log(allUsers);
    let values = {};
    let urls = {};
    allUsers.map((value, index) => {
      values[value.email] = value.title;
      this.getUrl(value.email).then(resp => {
        urls[value.email] = resp;
      });
    });
    
    await this.setState({
      token: token,
      sender: emailed,
      userName: values,
      urls: urls
    });
    this.getGroup();
  }
  getGroup = () => {
    let groupApi = new Promise(async (resolve, reject) => {
      let groupMsg = await axios.get("http://localhost:4001/group", {
        headers: { authorization: "Bearer " + this.state.token }
      });
      resolve(groupMsg);
    });
    groupApi.then(response => {
      let respObjArray = response.data.map((value, index) => {
        console.log("outside");
        return {
          text: value.message,
          id: index,
          sender: {
            name: this.state.userName[value.email],
            uid: value.email,
            avatar: this.state.urls[value.email]
          }
        };
      });
      if (this.state.groupArray.length < respObjArray.length) {
        this.setState({
          groupArray: respObjArray
        });
      }
    });
  };
  handleMsg = event => this.setState({ msg: event.target.value });
  submit = () => {
    let requestedBody = {
      email: this.state.sender,
      message: this.state.msg
    };
    this.setState({
      msg: ""
    });
    let socket = this.socket;
    console.log(socket, this.state.msg);
    socket.emit("send group message", {
      message: this.state.msg,
      email: this.state.sender
    });

    let chatmsg = {
      text: this.state.msg,
      id: this.state.groupArray.length + 1,
      sender: {
        name: this.state.userName[this.state.sender],
        uid: this.state.sender,
        avatar:this.state.urls[this.state.sender]
      }
    };

    this.setState({
      groupArray: [...this.state.groupArray, chatmsg]
    });
    socket.emit("group message", chatmsg);
    // axios.post("http://localhost:4001/sendgroupmsg", requestedBody, {
    //   headers: { authorization: "Bearer " + this.state.token }
    // });

    // setTimeout(this.getGroup, 1000);
    // setInterval(this.getGroup, 5000);
  };

  render() {
    const user = {
      uid: this.state.sender
    };
    return (
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
    );
  }
}
