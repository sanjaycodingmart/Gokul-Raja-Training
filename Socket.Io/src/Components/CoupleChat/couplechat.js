import React, { Component, Fragment } from "react";
import { ChatBox } from "react-chatbox-component";
import socketIOClient from "socket.io-client";
import io from "socket.io-client";
import axios from "axios";
import "./couplechat.css";
export default class CoupleChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      groupArray: [],
      sender: "",
      msg: "",
      receiver: "",
      userName: {},
      url: {},
      uniqueSocket: ""
    };
    
  
  }
  setSockets=()=>{

    this.sockets=io.connect("http://localhost:4001")
    this.socket = io.connect("http://localhost:4001/individual");
    this.socket.emit("unique ,",this.state.uniqueSocket)
    this.socket.on(this.state.uniqueSocket, data => {
      console.log("Inside Cons",this.state.uniqueSocket)
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
  };
  async componentDidMount(){
    console.log("Mounted");
    let token = await localStorage.getItem("token");
    let sender = await this.props.location.state.sender;
    let receiver = await this.props.location.state.receiver;
    let allUsers = this.props.location.state.allUsers;
    let values = {};
    allUsers.map((value, index) => {
      values[value.email] = value.title;
    });

    await this.setState({
      token: token,
      sender: sender,
      userName: values,
      receiver: receiver
    });
    await this.showUserChat();
    await this.setSockets();

  }
  async componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    if (this.props !== nextProps) {
      await this.setState({
        sender: nextProps.location.state.sender,
        receiver: nextProps.location.state.receiver
      });
      this.showUserChat();
    }
  }
  getUserChat = async () => {
    console.log("called");
    let sendUrl = await this.getUrl(this.state.sender);
    let recUrl = await this.getUrl(this.state.receiver);
    await this.setState({
      url: {
        sender: sendUrl,
        receiver: recUrl
      }
    });
    let requestedBody = {
      sender: this.state.sender,
      receiver: this.state.receiver
    };
    
    let chats = await axios.get("http://localhost:4001/getchatmsg", {
      headers: {
        authorization: "Bearer " + this.state.token
      },
      params: {
        sender: this.state.sender,
        receiver: this.state.receiver
      }
    });
    console.log("Chats", chats);
    let respObjArray = chats.data.map((value, index) => {
      return {
        text: value.message,
        id: value.sender,
        sender: {
          name: this.state.userName[value.sender],
          uid: value.sender,
          avatar:
            value.sender === this.state.sender
              ? this.state.url.sender
              : this.state.url.receiver
        }
      };
    });
    if (this.state.groupArray.length !== respObjArray.length) {
      console.log("Changes");
      this.setState({
        groupArray: respObjArray
      });
    }
    
   
  };

  showUserChat = async props => {
    let receiver = this.props.location.state.receiver;
    let userState = receiver.split(" ");
    let usermail = userState[1];
    let useRec = userState[0];
    await this.setState({
      groupArray: [],
      receiver: usermail,
      receiverName: useRec
    });
    let uniqueSocket = [this.state.sender, this.state.receiver].sort().join();
    this.setState({
      uniqueSocket
    });
    this.getUserChat();
  };
  chatMessageSent = () => {
    const requestedBody = {
      sender: this.state.sender,
      receiver: this.state.receiver,
      message: this.state.msg
    };
    
    let socket = this.sockets;
    console.log(socket, this.state.msg);
    socket.emit("send individual message", {
      sender: this.state.sender,
      receiver: this.state.receiver,
      message: this.state.msg
    });
    let chatmsgObj={
      text: this.state.msg,
      id: this.state.sender,
      sender: {
        name: this.state.userName[this.state.sender],
        uid: this.state.sender,
        avatar:
          this.state.sender === this.state.sender
            ? this.state.url.sender
            : this.state.url.receiver
      }
    };
    this.setState({
      groupArray:[...this.state.groupArray,chatmsgObj]
    })
    
    this.socket.emit(this.state.uniqueSocket,chatmsgObj)
    
    // axios.post("http://localhost:4001/sendIndmsg", requestedBody, {
    //   headers: { authorization: "Bearer " + this.state.token }
    // });
    // setTimeout(this.getUserChat, 2000);
    // setInterval(this.getUserChat, 5000);
    this.setState({
      msg: ""
    });
  };
  handleMsg = event => this.setState({ msg: event.target.value });

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
              <button onClick={this.chatMessageSent} className="sendButton">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
