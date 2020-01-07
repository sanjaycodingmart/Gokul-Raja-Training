import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

let favArray = [];
let favIndArr=[];
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  favClick: {
    color: red[500]
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [color, setColor] = React.useState("rgb(117,117,117)");
  const [redcolor, setredColor] = React.useState("red");
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const addFav = event => {
    if (color !== "red" && redcolor!=="red") {
      setColor("red");
      setredColor("red")
      let user = props.user;
      favArray.push(props.art);
      favIndArr.push(props.art.objIndex)
      let favNews = {
        favs: favArray
      };
      let favInd = {
        favsIndexes: favIndArr
      };
      localStorage.setItem(user, JSON.stringify(favNews));
      localStorage.setItem("favArrayIndex", JSON.stringify(favInd));
    } else {
      setredColor("rgb(117,117,117)");
      setColor("rgb(117,117,117)");
      let storage=JSON.parse(localStorage.getItem(props.user));
      let indexOfArticle=props.art.objIndex;
      console.log("index",indexOfArticle)
      console.log(storage.favs[0])
      let remIndex=storage.favs.map((fav)=>{
        return fav.objIndex
      }).indexOf(indexOfArticle);
      storage.favs.splice(remIndex,1);
      localStorage.setItem(props.user,JSON.stringify(storage));
    }
  };
  let abs = props.art.abstract.substring(0, 100) + "...";
 
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            NYT
          </Avatar>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {abs}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        {/* {isFav ? setColor("red") : setColor("rgb(117,117,117)")} */}
         {props.isfavs && <FavoriteIcon onClick={addFav} style={{ color: redcolor }} />}
         {!props.isfavs && <FavoriteIcon onClick={addFav} style={{ color: color }} />}

        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.art.paragraph}</Typography>
          <Typography paragraph></Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
