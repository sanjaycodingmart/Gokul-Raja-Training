import React, { Component, Fragment } from "react";
import "./header.css";
import SignIn from "./SignIn";
class Header extends Component {
  state = {
    showSignIn: false
  };
  submitClicked = () =>{
      this.setState({
          showSignIn:true
      })
  }
  render() {
    return (
      <Fragment>
        <div className="header-container">
          <div class="flex-container">
            <div className="signIn">
              <ul>
                <li>
                  <a class="active" href="#home">
                    MartSheet
                  </a>
                </li>
                <li style={{float:"right"}} onClick={this.submitClicked}>
                  <a href="#about">SignIn</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {this.state.showSignIn && <SignIn />}
        {/* <TableHeaders/> */}
        {/* <EntryTable/> */}
      </Fragment>
    );
  }
}
export default Header;
