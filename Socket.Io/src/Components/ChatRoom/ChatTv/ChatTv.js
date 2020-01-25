import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import React, { Component } from "react";
import { ChatBox } from "react-chatbox-component";
import "react-chatbox-component/dist/style.css";
import "./chattv.css";

class ChatTv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      groupArray: [],
      show: false,
      rec: "",
      msg: "",
      searchedUser: "",
      userList: [],
      sender: "",
      selectedUser: "",
      chatMode: false,
      receiver: "",
      senderName: "",
      receiverName: "",
      token: ""
    };
  }
  async componentDidMount() {
    let token = await localStorage.getItem("token");
    await this.setState({
      token: token
    });
    this.getGroup();

    let emailed = window.location.href.substring(36);
    let users = await axios.get("http://localhost:3005/getall", {
      headers: {
        authorization: "Bearer " + this.state.token
      }
    });
    let userNameArray = [];
    users.data.map((value, index) => {
      console.log(value);
      let name = { title: value.name, email: value.email };
      userNameArray.push(name);
    });
    this.setState({
      userList: userNameArray,
      sender: emailed
    });
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
        console.log(value.name);
        return {
          text: value.message,
          id: value.email,
          sender: {
            name: value.name,
            uid: value.email
          }
        };
      });
      this.setState({
        groupArray: respObjArray,
        show: true
      });
    });
  };

  handleMsg = event => this.setState({ msg: event.target.value });
  submit = () => {
    let emailed = window.location.href.substring(36);
    let name = localStorage.getItem(emailed);
    let requestedBody = {
      email: emailed,
      name: name,
      message: this.state.msg
    };
    this.setState({
      senderName: name,
      msg: "",
      sender: emailed
    });
    axios.post("http://localhost:3005/sendgroupmsg", requestedBody, {
      headers: { authorization: "Bearer " + this.state.token }
    });
    setTimeout(this.getGroup, 1000);
  };
  handleUser = event => {
    this.setState({
      selectedUser: event.target.value
    });
  };
  getUserChat = async () => {
    console.log("called");
    let requestedBody = {
      sender: this.state.sender,
      receiver: this.state.receiver
    };
    let chats = await axios.get(
      "http://localhost:3005/getchatmsg",{
        headers: { 
          authorization: "Bearer " + this.state.token 
        },
        params: {
          sender: this.state.sender,
          receiver: this.state.receiver
        }
      }
      
      
    );
    let respObjArray = chats.data.map((value, index) => {
      return {
        text: value.message,
        id: value.sender,
        sender: {
          name: value.sender,
          uid: value.sender
        }
      };
    });
    this.setState({
      groupArray: respObjArray
    });
  };
  showUserChat = async () => {
    let userState = this.state.selectedUser.split(" ");
    let usermail = userState[1];
    let useRec = userState[0];
    await this.setState({
      groupArray: [],
      chatMode: true,
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

  useStyles = makeStyles(theme => ({
    root: {
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    text: {
      padding: theme.spacing(2, 2, 0)
    },
    paper: {
      paddingBottom: 50,
      Width: 80
    },
    list: {
      marginBottom: theme.spacing(2)
    },
    subheader: {
      backgroundColor: theme.palette.background.paper
    },
    appBar: {
      top: "auto",
      bottom: 0
    },
    grow: {
      flexGrow: 1
    },
    grpButton: {
      width: 200,
      float: "right"
    },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: "0 auto"
    }
  }));

  render() {
    const user = {
      uid: this.state.sender
    };
    const classes = this.useStyles;

    return (
      <React.Fragment>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={this.state.userList.map(
            option => option.title + " " + option.email
          )}
          renderInput={params => (
            <TextField
              {...params}
              label="Search Users"
              value={this.state.searchedUser}
              onChange={this.handleUser}
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
        <CssBaseline />
        <Paper square className={classes.paper}>
          <Button
            variant="contained"
            className={classes.grpButton}
            color="primary"
            onClick={this.showUserChat}
            disableElevation
          >
            Go
          </Button>
          <Typography className={classes.text} variant="h5" gutterBottom>
            Inbox
          </Typography>
          {!this.state.chatMode && (
            <List className={classes.list}>
              <React.Fragment>
                <div className="container">
                  <div className="chat-header"></div>
                  <ChatBox messages={this.state.groupArray} user={user} />
                </div>
                {/* {
                    <ListSubheader
                      className={classes.subheader}
                    ></ListSubheader>
                  }
                  <ListItem button>
                    <ListItemText primary={name} secondary={message} />
                  </ListItem> */}
              </React.Fragment>
            </List>
          )}
          {this.state.chatMode && (
            <List className={classes.list}>
              <React.Fragment>
                <div className="container">
                  <div className="chat-header"></div>
                  <ChatBox messages={this.state.groupArray} user={user} />
                </div>
                {/* {
                      <ListSubheader
                        className={classes.subheader}
                      ></ListSubheader>
                    }

                    <ListItem button>
                      <ListItemText primary={sender} secondary={message} />
                    </ListItem> */}
              </React.Fragment>
            </List>
          )}
        </Paper>

        <div className={classes.root} noValidate autoComplete="off">
          {/*'div',
        //   { className: 'msg-footer' },
        //   React.createElement(
        //     'form',
        //     {
        //       className: 'message-form',
        //       onSubmit: this.handleSendMessage },
        //     React.createElement(
        //       'div',
        //       { className: 'input-group' },
        //       React.createElement('input', {
        //         type: 'text',
        //         className: 'form-control message-input',
        //         placeholder: 'Type something',
        //         value: message,
        //         onChange: function onChange(event) {
        //           return _this2.setState({ message: event.target.value });
        //         },
        //         required: true
        //       }) <TextField
            id="outlined-basic"
            label="Chat Here"
            variant="outlined"
            onChange={this.handleMsg}
            value={this.state.msg}
          /> */}

          {/* {!this.state.chatMode && (
            <button onClick={this.submit} style={{ Width: 20 }}>
              Send Message
            </button>
          )}
          {this.state.chatMode && (
            <button onClick={this.chatMessageSent} style={{ Width: 20 }}>
              Send
            </button>
          )}
        </div> */}
        </div>
        {!this.state.chatMode && (
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
        )}
        {this.state.chatMode && (
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
        )}
      </React.Fragment>
    );
  }
}
export default ChatTv;
