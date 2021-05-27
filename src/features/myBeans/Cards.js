import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Avatar from "./Avatar";
import Chip from "./Chips";
import { storage } from "../../firebase.js";
import { db } from "../../firebase.js";
import PropTypes from "prop-types";

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
    marginTop: 20,
  },
  time: {
    marginTop: 20,
    marginLeft: 200,
  },
}));

export default function Cards(props) {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const keyWords = props.val;

  useEffect(() => {
    const fetchData = async () => {
      let snapShot_store = "";
      let snapShot_country = "";
      let snapShot_flavor = "";
      let snapShot_roast = "";

      snapShot_roast = await db
        .collection("cards")
        .where("roast", "in", keyWords)
        .get();
      snapShot_store = await db
        .collection("cards")
        .where("storeName", "in", keyWords)
        .get();
      snapShot_country = await db
        .collection("cards")
        .where("countryName", "in", keyWords)
        .get();
      snapShot_flavor = await db
        .collection("cards")
        .where("flavors", "array-contains-any", keyWords)
        .get();

      const cards_store = snapShot_store.docs.map((doc) => {
        const item = doc.data();
        return item;
      });
      const cards_country = snapShot_country.docs.map((doc) => {
        const item = doc.data();
        return item;
      });
      const cards_flavor = snapShot_flavor.docs.map((doc) => {
        const item = doc.data();
        return item;
      });
      const cards_roast = snapShot_roast.docs.map((doc) => {
        const item = doc.data();
        return item;
      });

      let cards = cards_store
        .concat(cards_country)
        .concat(cards_flavor)
        .concat(cards_roast);

      const resultcards = Array.from(
        cards
          .reduce(
            (map, currentitem) => map.set(currentitem.coffeeName, currentitem),
            new Map()
          )
          .values()
      );

      setCards(resultcards);
    };
    fetchData();
  }, [keyWords]);

  const cardsItem = cards.map((card, index) => {
    storage
      .child("member/" + card.pictureURL)
      .getDownloadURL()
      .then((url) => {
        let pictureURL = document.getElementById(card.pictureURL);
        if (pictureURL != null) {
          pictureURL.src = url;
        }
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
                ></Typography>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  });

  return <>{cardsItem}</>;
}

Cards.propTypes = {
  val: PropTypes.array,
};
