import React, { Component, Fragment } from "react";
import { ChatBox } from "react-chatbox-component";
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
      userName: {}
    };
  }
  async componentDidMount() {
    console.log("Mounted");
    let token = await localStorage.getItem("token");
    let sender = this.props.location.state.sender;
    let allUsers = this.props.location.state.allUsers;
    let values = {};
    allUsers.map((value, index) => {
      values[value.email] = value.title;
    });

    await this.setState({
      token: token,
      sender: sender,
      userName: values
    });
    this.showUserChat();
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
    let requestedBody = {
      sender: this.state.sender,
      receiver: this.state.receiver
    };
    let chats = await axios.get("http://localhost:3005/getchatmsg", {
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
          avatar: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
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
    this.getUserChat();
  };
  chatMessageSent = () => {
    const requestedBody = {
      sender: this.state.sender,
      receiver: this.state.receiver,
      message: this.state.msg
    };
    this.setState({
      msg: ""
    });
    axios.post("http://localhost:3005/sendIndmsg", requestedBody, {
      headers: { authorization: "Bearer " + this.state.token }
    });
    setTimeout(this.getUserChat, 2000);
    setInterval(this.getUserChat, 5000);
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
