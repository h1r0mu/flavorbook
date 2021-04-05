import Avatar from "../../components/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "./Chips";
import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// import { selectBeans } from "./beansSlice";
import { storage } from "../../firebase";
import { useSelector } from "react-redux";

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
    maxwidth: 200,
    maxheight: 200,
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

export default function Cards() {
  const classes = useStyles();

  const cards = useSelector((state) => Object.values(state.beans.entities));
  const loadingStatus = useSelector((state) => state.beans.status);

  if (loadingStatus === "loading") {
    return (
      <div>
        <div className="loader" />
      </div>
    );
  }

  const cardsItem = cards.map((card, index) => {
    storage
      .child("member/" + card.pictureURL)
      .getDownloadURL()
      .then((url) => {
        document.getElementById(card.pictureURL).src = url;
      });
    return (
      <div key={index}>
        <Card className={classes.root} key={index}>
          <img
            id={card.pictureURL}
            src=""
            alt={card.pictureURL}
            className={classes.cover}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="subtitle1" color="textSecondary">
                {card.storeName}
                <ShoppingCartIcon />
              </Typography>
              <div className={classes.coffeeName}>
                <Avatar className={classes.avatar} />
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.bold}
                >
                  {card.coffeeName}
                </Typography>
              </div>
              <Typography variant="subtitle1" color="textSecondary">
                subtitle
              </Typography>
              <div className={classes.chips}>
                {card.flavors.map((flavor, index) => (
                  <Chip name={flavor} color="primary" key={index} />
                ))}
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={classes.time}
                >
                  2001-3-14
                </Typography>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  });

  return <>{cardsItem}</>;
}
