import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Avatar from "./Avatar";
import Chip from "./Chips";
import { storage } from "../firebase";
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1000,
    display: "flex",
    margin: "auto",
    marginTop: "10px",
    backgroundColor: "white",
    borderRadius: 40,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    margin: 20,
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  coffeeName: {
    display: "flex",
    flexWrap: "no-wrap",
    marginTop: 20,
    marginBottom: 20,
  },
  bold: {
    fontWeight: 600,
  },
  avatar: {
    margin: 0,
  },
  chips: {
    display: "flex",
    flexWrap: "no-wrap",
    marginTop: 30,
  },
  time: {
    marginTop: 20,
    marginLeft: 200,
  },
}));

export default function MediaControlCard(props) {
  const classes = useStyles();
  var imgSample = storage.child("member/" + props.picName);
  imgSample.getDownloadURL().then((downloadURL) => {
    document.getElementById(props.picName).src = downloadURL;
  });
  const flavorItems = props.flavors;
  const chips = flavorItems.map((flavor) => <Chip name={flavor} />);

  return (
    <Card className={classes.root} key={props.coffeeName + props.picName>
      <img
        id={props.picName}
        src=""
        alt={props.picName}
        className={classes.cover}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary">
            {props.storeName}
            <ShoppingCartIcon />
          </Typography>
          <div className={classes.coffeeName}>
            <Avatar className={classes.avatar} />
            <Typography component="h3" variant="h5" className={classes.bold}>
              {props.coffeeName}
            </Typography>
          </div>
          <Typography variant="subtitle1" color="textSecondary">
            {props.subtitle}
          </Typography>
          <div className={classes.chips}>
            {chips}
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.time}
            >
              2021-3-14
            </Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

Card.propTypes = {
  picName: Proptypes.string,
  flavors: Proptypes.array,
  storeName: Proptypes.string,
  coffeeeName: Proptypes.string,
  subtitle: Proptypes.string,
};
