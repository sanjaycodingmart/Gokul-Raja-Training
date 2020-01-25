/* eslint-disable no-use-before-define */
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import React, { Component, Fragment } from 'react';
export default class SearchUser extends Component {
    constructor(props){
        super(props);
        this.state={
            searchedUser:"",
            userList:[],
            selectedUser:""
        }
    }
    async componentDidMount(){
        let users= await axios.get('http://localhost:3005/users')
        let userNameArray=[]
        users.data.map((value,index)=>{
          console.log(value)
         let name={ title: value.name};
         userNameArray.push(name);
        });
        this.setState({
            userList:userNameArray
        })
    }
    handleUser = (event)=>{
      this.setState({
        selectedUser:event.target.value
      })
    }
    render(){
  return (
      <Fragment>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={this.state.userList.map(option => option.title)}
        renderInput={params => (
          <TextField
            {...params}
            label="Search Users"
            margin="normal"
            variant="outlined"
            onChange={this.handleUser}
            fullWidth
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
      </Fragment>
  );
}
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top