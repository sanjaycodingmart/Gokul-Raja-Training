import React, { Component, Fragment } from "react";
import "./favourite.css";
import RecipeReviewCard from './ArticleCard';
class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favs: {},
      favsReceived: false
    };
    this.lists = null;
  }
  async componentWillMount() {
    let userName = await this.props.user;
    console.log(userName);
    let resp = await this.getFavs(userName);
    if (resp) {
      this.setState({
        favs: resp.favs,
        favsReceived: true
      });
    }
  }

  async getFavs(userName) {
    let localValue = await JSON.parse(localStorage.getItem(userName));
    return localValue;
  }
  render() {
    if (this.state.favsReceived) {
      return (
        <Fragment>
          
            {this.state.favs.map((value, index) => {
              return (
                <div  className="favos">
                <RecipeReviewCard art={value} isfavs={true}/>
                </div>
              );
            })}
          
        </Fragment>
      );
    } else{
      return (
        <Fragment>
          <h1>The List is Empty</h1>
        </Fragment>
      );
    }
  }
}
export default Favourite;
