import React, { Component, Fragment } from "react";
import "./documentabstract.css";
import Favourite from "./Favourite";
import VerticalModal from "./VerticalModal";
import RecipeReviewCard from "./ArticleCard";

class DocumentAbstract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      favs: [],
      isEmpty: true,
      showFavs: false,
      showAbs: true,
      showModal: false,
      documentState: {}
    };
    this.favArray = [];
  }
  UNSAFE_componentWillMount() {
    this.setState(
      {
        isEmpty: false,
        lists: this.props.list
      },
      () => this.temp()
    );
  }

  temp = () => {
    console.log("set state", this.state);
  };
  showFavs = () => {
    localStorage.setItem("persistentState", JSON.stringify(this.state));
    this.setState({
      showFavs: true,
      showAbs: false
    });
  };
  hideFavs = () => {
    let stated = JSON.parse(localStorage.getItem("persistentState"));
    console.log(stated);
    // this.setState({
    //   lists: stated.lists,
    //   favs: stated.favs,
    //   isEmpty: stated.isEmpty,
    //   showFavs: stated.showFavs,
    //   showAbs: stated.showAbs,
    //   showModal: stated.showModal,
    //   documentState: stated.documentState
    // });
    this.setState({
      showAbs: true,
      showFavs: false,
      showModal: false
    });
  };
  showFullNews = event => {
    let indexofNews = event.target.id;
    console.log(indexofNews);
    let document = this.props.list[indexofNews];
    this.setState({
      showModal: true,
      showAbs: false,
      documentState: document
    });
  };
  render() {
    let FavouriteIndex = JSON.parse(localStorage.getItem("favArrayIndex"));
    let indexArray = FavouriteIndex.favsIndexes;
    let nofav = false;
    if (!this.state.isEmpty && this.props.list.length !== 0) {
      return (
        <Fragment>
          <div className="doc-container">
            <div className="Favourite">
              <button className="fav-button" onClick={this.showFavs}>
                Show Favourites
              </button>
            </div>
            <div className="Favourite">
              <button className="fav-button" onClick={this.hideFavs}>
                Hide Favourites
              </button>
            </div>
          </div>
          <div class="card-container">
            {this.state.showAbs &&
              this.props.list.length !== 0 &&
              this.props.list.map((value, index) => {
                if (indexArray.includes(value.objIndex)) {
                  console.log(value.objIndex);
                  nofav = true;
                } else {
                  nofav = false;
                }
                return (
                  <Fragment>
                    <div className="docus" key={index} id={value.objIndex}>
                      <RecipeReviewCard
                        art={value}
                        user={this.props.userName}
                        isfavs={nofav}
                        
                      />
                    </div>
                  </Fragment>
                );
              })}
          </div>
          {this.state.showModal && (
            <VerticalModal article={this.state.documentState} />
          )}
          {this.state.showFavs && <Favourite user={this.props.userName} />}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <h1>Loading</h1>
      </Fragment>
    );
  }
}

export default DocumentAbstract;
