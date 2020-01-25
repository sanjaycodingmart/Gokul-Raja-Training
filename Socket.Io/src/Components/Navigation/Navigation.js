import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../Constants/routes";
import CoupleChat from "../CoupleChat/couplechat";
import "./header.css";
import Tooltip from "@material-ui/core/Tooltip";
import MenuAppBar from "../Profile/profile";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ChatMode: false,
      log: false,
      left: false,
      userList: [],
      sender: "",
      token: "",
      selectedUser: "",
      chattedUser: [],
      soloUser: "",
      about:{}
    };
  }
  // async componentDidMount() {
  //   localStorage.setItem("token", "");
  // }
  componentWillMount() {
    setInterval(this.checkLog, 2000);
  }

  checkLog = async () => {
    if (localStorage.getItem("token").length > 0) {
      this.setState({
        log: true,
        token: localStorage.getItem("token")
      });
      this.showAll();
      let users =await axios.get("http://localhost:4001/getabout");
      let values = {};
      users.data.map((value, index) => {
        values[value.email] = value.about;
      });
      this.setState({
        about:values
      })
  
      
    } else {
      this.setState({
        log: false,
        token: ""
      });
    }
  };
  handleUser = event => {
    this.setState({
      selectedUser: event.target.value
    });
  };
  addUserChat = () => {
    

    if (!this.state.chattedUser.includes(this.state.selectedUser)) {
      this.setState({
        chattedUser: [...this.state.chattedUser, this.state.selectedUser]
      });
    } else {
      return;
    }
    
  };
  sideList = side => (
    <div
      className="list"
      role="presentation"
      // onClick={this.toggleDrawer(side, false)}
      // onKeyDown={this.toggleDrawer(side, false)}
    >
      <List>
        <ListItem button key={"1"}>
          <ListItemIcon>
            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
          </ListItemIcon>
          <ListItemText primary={"Channels"} />
          <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
        </ListItem>

        <Link
          to={{
            pathname: "/groupchat",
            state: {
              sender: this.state.sender,
              allUsers: this.state.userList
            }
          }}
        >
          <ListItem button key={"2"}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={"#CodingMart"} />
          </ListItem>
        </Link>
      </List>

      <Divider />
      <List>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={this.state.userList.map(option =>
            option.status === "active"
              ? option.title + " " + option.email + " " +String.fromCodePoint(0x2714) +option.status
              : option.title + " " + option.email+" "+String.fromCodePoint(0x1f4a4)
          )}
          renderInput={params => (
            <TextField
              {...params}
              label="Search Users"
              onChange={this.handleUser}
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
        <button onClick={this.addUserChat}><Link
            to={{
              pathname: "/couplechat",
              state: {
                receiver: this.state.selectedUser,
                sender: this.state.sender,
                allUsers: this.state.userList,
              }
            }}
          >+</Link></button>
        {this.state.chattedUser.map((text, index) => (
          
          <Link
            to={{
              pathname: "/couplechat",
              state: {
                receiver: text,
                sender: this.state.sender,
                allUsers: this.state.userList
              }
            }}
          >
            {" "}
            
              <ListItem button key={index}>
                
                  <ListItemIcon>
                  <Tooltip title={this.state.about[text.split(" ")[1]]} interactive><Button> <Avatar>{text[0]}</Avatar>
                  </Button></Tooltip>
                   </ListItemIcon>
                  
                <ListItemText primary={text} />
              </ListItem>
           
          </Link>
        ))}
      </List>
    </div>
  );
  toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (this.state.log) {
      this.setState({
        left: open
      });
    } else {
      alert("Please Log In and Try Again");
    }
  };

  showAll = async () => {
    let users = await axios.get("http://localhost:4001/getall", {
      headers: {
        authorization: "Bearer " + this.state.token
      }
    });
    let userNameArray = [];
    users.data.map((value, index) => {
      let name = {
        title: value.name,
        email: value.email,
        status: value.status
      };
      userNameArray.push(name);
    });

    await this.setState({
      userList: userNameArray,
      sender: localStorage.getItem("loggedIn")
    });
    return true;
  };
  render() {
    return (
      <Fragment>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          {this.sideList("left")}
        </Drawer>
        <div className="root">
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className="menuButton"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon onClick={this.toggleDrawer("left", true)} />
              </IconButton>
              <Typography variant="h6" className="title">
                Slacked
              </Typography>

              {this.state.log === false && (
                <Button color="inherit">
                  <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                </Button>
              )}
              {this.state.log === false && (
                <Button color="inherit" className="buttons">
                  <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                </Button>
              )}
              {!this.state.log === false && <MenuAppBar />}

              {!this.state.log === false && (
                <Fragment>
                  <p>Signed In as {localStorage.getItem("loggedIn")}</p>
                </Fragment>
              )}
            </Toolbar>
          </AppBar>
        </div>
        {this.state.ChatMode && <CoupleChat receiver={this.state.soloUser} />}
      </Fragment>
    );
  }
}
