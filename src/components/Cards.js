import React, { useEffect, useState } from "react";

import Avatar from "./Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "./Chips";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";
import { db } from "../firebase.js";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../firebase";

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
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const ref = db.collection("cards");
      const snapShot = await ref.get();
      const _cards = snapShot.docs.map((doc) => {
        const item = doc.data();
        return item;
      });
      setCards(_cards);
    };
    fetchData();
  }, []);

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
