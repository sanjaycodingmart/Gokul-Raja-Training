import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import RecipeReviewCard from './ArticleCard';


class VerticalModal extends Component {
   
   render(){
       document.getElementById("back-button").style.display="block";
       return(
           
               <Jumbotron fluid>
                    <Container>
                    {/* <img src={`https://www.nytimes.com/`+this.props.article.image.url} alt="Article"/> */}

                    <h6><b>{this.props.article.snippets}</b></h6>
                    <p>{this.props.article.paragraph}</p>
                    <a href={this.props.article.urls} >Click here to know more</a>
                    </Container>
                <RecipeReviewCard/>
               </Jumbotron>
           
       )
   }
   
  }
  export default VerticalModal;