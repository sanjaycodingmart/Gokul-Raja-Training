import React, { Component, Fragment } from "react";
import { ChatBox } from "../react-chatbox-component";
import axios from "axios";
import "./navigation.css";
import Submit from "./Submit"
import io from "socket.io-client";
import SearchBar from "./SearchBar";
export default class ChatBoxed extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      msg: "",
      channelMessage: [],
      channelId: props.channelid,
      image: null
    };

    this.socket = io.connect("http://localhost:4001");
    this.user = {
        uid: "user1"
      };
  }
receiveData =()=>{

}
  async componentDidMount() {
    // this.getMessages();
  }
//   getSockets = () => {};
//   componentDidUpdate = () => {
//       console.log("2")
    
//   };

  componentWillReceiveProps(nextProps) {
console.log("RRRRR")
    if (nextProps.channelid !== this.props.channelId) {
        console.log("1")
      this.setState({
        channelId: nextProps.channelid,
        channelMessage:[]
      },()=>{
        this.getMessages();
      });
      
      this.socket.removeAllListeners();
    this.socket.on(this.state.channelId, data => {
      console.log(data);
      let isBold = false;
      let isItalic = false;
      let isStrike = false;
        console.log("DATA",data)
      if (data.files) {
          console.log("Sending Files")
        let reply = {
          text: data.files[0].url_private,
          id: data.ts,
          sender: {
            uid: data.user,
            avatar: data.files[0].url_private
            // "avatar":"https://data.cometchat.com/assets/images/avatars/ironman.png"
          }
        };
        // debugger
        // const resp = this.state.channelMessage
        // resp.concat(reply)
        // this.setState({
        //   channelMessage: resp
        // });
        const {channelMessage} = this.state
        channelMessage.concat(reply)
        this.setState({channelMessage});
      } else {
        if (data.text[0] === "*" && data.text[data.text.length - 1] === "*") {
          isBold = true;
          data.text = data.text.substring(1, data.text.length - 1);
        }
        if (data.text[0] === "_" && data.text[data.text.length - 1] === "_") {
          isItalic = true;
          data.text = data.text.substring(1, data.text.length - 1);
        }
        if (data.text[0] === "~" && data.text[data.text.length - 1] === "~") {
          isStrike = true;
          data.text = data.text.substring(1, data.text.length - 1);
        }
        let reply = {
          text: data.text,
          id: data.ts,
          isBold: isBold,
          isItalic: isItalic,
          isStrike: isStrike,
          sender: {
            uid: data.user
          }
        };
        const {channelMessage} = this.state
        channelMessage.concat(reply)
        this.setState({channelMessage});
      }
    });
      //     this.getSockets();
    }
  }
 

  getMessages = async () => {
    let channelid = this.props.channelid;
    let {data} = await axios.get(
      "/conversations.history",
      {
        params: {
          token: localStorage.getItem("token"),
          channel: channelid
        }
      }
    );
    console.log(data);
    let channelArray = data.messages.map((data, index) => {
      let flag = false;
      let isBold = false;
      let isItalic = false;
      let isStrike = false;
      if (data.text[0] === "*" && data.text[data.text.length - 1] === "*") {
        isBold = true;
        data.text = data.text.substring(1, data.text.length - 1);
        flag = true;
      } else if (
        data.text[0] === "_" &&
        data.text[data.text.length - 1] === "_"
      ) {
        isItalic = true;
        data.text = data.text.substring(1, data.text.length - 1);
        flag = true;
      } else if (
        data.text[0] === "~" &&
        data.text[data.text.length - 1] === "~"
      ) {
        isStrike = true;
        data.text = data.text.substring(1, data.text.length - 1);
        flag = true;
      }
      if (data.files) {
        return{
          text: data.files[0].url_private_download,
          id: data.text,
          sender: {
            uid: data.user,
            avatar: data.files[0].url_private_download
            // "avatar":"https://data.cometchat.com/assets/images/avatars/ironman.png"
          }}
        };
      if (flag) {
        return {
          text: data.text,
          id: data.text,
          isBold: isBold,
          isItalic: isItalic,
          isStrike: isStrike,
          sender: {
            uid: data.user
          }
        };
      } else {
        return {
          text: data.text.split(":")[0],
          id: data.ts,
          sender: {
            uid: data.user
          }
        };
      }
    });
    console.log("CHannel",channelArray)
    this.setState({
      channelMessage: channelArray
    });
    // const {channelMessage} = this.state
    // // channelMessage.push(reply)
    // this.setState({channelMessage});
  };

    
  
  submit = async (msg,image) => {
      console.log(image)
    let token = localStorage.getItem("token");
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Accept, Authorization",
        Authorization: "Bearer " + token
      }
    };
    const bodyMsgParameters = {
      channel: this.state.channelId,
      text: msg,
      type: "mrkdwn"
    };
    axios
      .post("/chat.postMessage", bodyMsgParameters, config)
      .then(resp => {
        console.log(resp);
      });
    let formData = new FormData();
    formData.append("file", image);
    formData.append("channels", this.state.channelId);

    const bodyFileParameters = {
      channel: this.state.channelId,
      file: image,
      content: "Hello"
    };
    axios
      .post("/files.upload", formData, config)
      .then(resp => {
        console.log(resp);
      });
    // }
    //   );

    // this.setState({
    //   msg: ""
    // });
  };
  searchQuery =(query)=>{
    var list = document.getElementsByClassName("message");
    for (let item of list) {
        if(item.innerHTML===query){
            item.style.background="yellow"
            item.scrollIntoView();
        }
    }
  }
  render() {
    console.log("rerendering")
    return (
      <Fragment>
      <SearchBar searchQuery={this.searchQuery}/>

        <div
          className="container"
          style={{ maxWidth: "800px", paddingTop: "100px" }}
        >
        
          <div className="chat-header"></div>
          <ChatBox messages={this.state.channelMessage} user={this.user} />
        </div>
        <Submit submit={this.submit}/>
       
      </Fragment>
    );
  }
}
