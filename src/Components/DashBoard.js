import React, { Component, Fragment } from "react";
import SearchBar from "./SearchBar";
import queryString from "query-string";
import './dashboard.css'

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  UNSAFE_componentWillMount() {
    const values = queryString.parse(this.props.location.search);
    this.setState({
      name: values.search
    });
  }
  render() {
    return (
      <Fragment>
        <div>
          <h6 className="signedIn">Logged as  {this.state.name}  </h6>
        </div>

        <SearchBar userName={this.state.name} />
      </Fragment>
    );
  }
}

export default DashBoard;
