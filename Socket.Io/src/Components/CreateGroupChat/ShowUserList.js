import React from "react";
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Snackbar from '@material-ui/core/Snackbar';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CheckboxListSecondary(props) {
  const classes = useStyles();
  const [open,setopen]=React.useState(false)
  const [checked, setChecked] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  React.useEffect(() => {
    const users = axios.get("http://localhost:4001/getall", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    users.then(resp => {
      setUserList(resp.data);
    });
  }, [userList]);

  const createGroup = async () => {
    let requestBody = {
      groupname: props.group,
      groupadmin: localStorage.getItem("loggedIn"),
      members: checked
    };
    console.log(requestBody);
    addGroups();
    setopen(true)
    setChecked([])
    let send = await axios.post("http://localhost:4001/addgroup", requestBody);
    
  };
  const addGroups = () => {
    alert("Called");
      axios.post("http://localhost:4001/addusergroup", {
        groupname: props.group,
        members: checked
      });
      console.log("Added User Groups")
    
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopen(false);
  };
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <React.Fragment>
      <List dense className={classes.root}>
        <h1>Add Users for the Group - {props.group}</h1>
        {userList.map((value, index) => {
          const labelId = `checkbox-list-secondary-label-${value.email}`;
          return (
            <ListItem key={value.email} button>
              <ListItemAvatar>
                <Avatar alt={value.email} src={value.url} />
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={
                  value.name.charAt(0).toUpperCase() +
                  value.name.slice(1) +
                  " " +
                  "(" +
                  value.email +
                  ")"
                }
              />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value.email)}
                  checked={checked.indexOf(value.email) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <Button variant="contained" color="primary" onClick={()=>createGroup()}>
        Create Group
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Group Created Successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
