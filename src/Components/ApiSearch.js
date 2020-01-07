import React, { Component, Fragment } from "react";
import DocumentAbstract from "./DocumentAbstract";

class ApiSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "flQP4CPc4Y4KgXAgoA8KN9IbqAirvTpU",
      ids: 0,
      abs: [],
      search: "",
      isCalled: true
    };
  }
  Fetch = async url => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  callApi = async mesg => {
    let favNews = {
      favs: []
    };

    let favInd = {
      favsIndexes: []
    };
    localStorage.setItem(this.props.userName, JSON.stringify(favNews));
    localStorage.setItem("favArrayIndex", JSON.stringify(favInd));
    let temp = [];
    console.log("API Called");
    await this.Fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=flQP4CPc4Y4KgXAgoA8KN9IbqAirvTpU&q=${mesg}`
    ).then(res => {
      res.response.docs.map((data, index) => {
        debugger;
        let tempObj = {
          objIndex: index,
          abstract: data.abstract,
          urls: data.web_url,
          snippets: data.snippet,
          paragraph: data.lead_paragraph,
          image: data.multimedia[0]
        };
        temp.push(tempObj);
      });
      this.setState({
        abs: temp,
        isCalled: false
      });

      return temp;
    });
  };
  async componentWillMount() {
    this.setState({
      search: this.props.msg
    });
    await this.callApi(this.props.msg);
  }

  render() {
    if (!this.isCalled && this.state.abs.length !== 0) {
      let listed = this.state.abs;
      return (
        <Fragment>
          <DocumentAbstract list={listed} userName={this.props.userName} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <h1>Searching...</h1>
      </Fragment>
    );
  }
}
export default ApiSearch;
