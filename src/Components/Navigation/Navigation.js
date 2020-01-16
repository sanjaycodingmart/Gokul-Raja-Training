import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import * as ROUTES from "../Constants/routes";
import "./header.css";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: false,
      left: false
    };
  }
  componentDidMount() {
    localStorage.setItem("token", "");
    setInterval(this.checkLog, 2000);
  }
  checkLog = () => {
    if (localStorage.getItem("token").length > 0) {
      this.setState({
        log: true
      });
    } else {
      this.setState({
        log: false
      });
    }
  };
  // changeRoute = () => props.history.push('/groupchat'+'?user='+email);
  sideList = side => (
    <div
      className="list"
      role="presentation"
      onClick={this.toggleDrawer(side, false)}
      onKeyDown={this.toggleDrawer(side, false)}
    >
      <List>
          <ListItem button key={"1"}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={"Channels"} />
          </ListItem>
          <ListItem button key={"2"} onClick={this.changeRoute}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={"#CodingMart"} />
          </ListItem>
        
      </List>
      <Divider />
      <List>
        {["Search Users", "User1", "User2"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
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
if(this.state.log){
  this.setState({
    left: open
  });
}
else{
  alert("Please Log In and Try Again")
}
   
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
              {!this.state.log === false && (
                <Button color="inherit">
                  <Link to="/">
                    <div
                      onClick={() => {
                        localStorage.setItem("token", "");
                      }}
                    >
                      Log Out
                    </div>
                  </Link>
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </Fragment>
    );
  }
}
