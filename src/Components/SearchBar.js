import React, { Component, Fragment } from "react";
import "./searchbar.css";
import ApiSearch from "./ApiSearch";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isSubmitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitted = this.submitted.bind(this);
  }
  handleChange(event) {
    this.setState({
      text: event.target.value
    });
  }
  submitted() {
    this.setState({ isSubmitted: true });
  }
  render() {
    if (this.state.isSubmitted) {
      return <ApiSearch msg={this.state.text} userName={this.props.userName} />;
    }
    return (
      <Fragment>
        <div className="flexbox">
          <div className="search">
            <input
              type="text"
              id="search"
              value={this.state.text}
              onChange={this.handleChange}
              placeholder="Search Articles here. . ."
              required
            />
            <button className="submit" onClick={this.submitted}>
              SUBMIT
            </button>
          </div>
        </div>
        
      </Fragment>
    );
  }
}
export default SearchBar;
