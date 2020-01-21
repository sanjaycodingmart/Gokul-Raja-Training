import React, { Component, Fragment } from "react";
import axios from 'axios';
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
        about:"",
        token:""
    };
  }
  handleAbout = (event)=>{
      this.setState({
          about:event.target.value
      })
  }
  async componentDidMount(){
      this.setState({
          token:localStorage.getItem("token")
      })
      
  }
  update = async()=>{
    let requested={
        about:this.state.about,
        email:localStorage.getItem("loggedIn")
    }
  let users =  await axios.post("http://localhost:3005/setabout",requested, {
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
              placeholder="Enter Email Id"
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
