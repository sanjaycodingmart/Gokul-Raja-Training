import React, { Component, Fragment } from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode'
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
        about:"",
        token:"",
        loggedIn:""
    };
  }
  handleAbout = (event)=>{
      this.setState({
          about:event.target.value
      })
  }
  async componentDidMount(){
    let loggedIn=jwt_decode(localStorage.getItem("token"))
      this.setState({
          token:localStorage.getItem("token"),
          loggedIn:loggedIn.email
      })
      
  }
  update = async()=>{
    let requested={
        about:this.state.about,
        email:this.state.loggedIn
    }
  let users =  await axios.post("http://localhost:4001/setabout",requested, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token")
      }
    });
  }
  render() {
    return (
      <Fragment>

          <div className="container">
          
            <label>
              <b>About</b>
            </label>
            <input
              type="email"
              placeholder="Enter your Status Here"
              name="email"
              onChange={this.handleAbout}
              required
            />
           
          
            <button type="submit" className="sign" onClick={this.update}>
              Update
            </button>
          </div>
        
      </Fragment>
    );
  }
}
