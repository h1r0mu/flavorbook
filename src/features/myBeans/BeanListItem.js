import { React, useEffect, useState } from "react";

import Avatar from "../../components/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "./Chips";
import PropTypes from "prop-types";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { selectBeanById } from "./beansSlice";
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

const BeanListItem = ({ id }) => {
  const classes = useStyles();
  const bean = useSelector((state) => selectBeanById(state, id));
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImageSrc = async (url) => {
      const imageSrc = await storage.child(url).getDownloadURL();
      setImageSrc(imageSrc);
    };
    if (bean.pictureURL) {
      fetchImageSrc("member/" + bean.pictureURL);
    }
  }, []);

  if (imageSrc == null) {
    return (
      <div>
        <div className="loader" />
      </div>
    );
  }

  return (
    <Card className={classes.root} key={id}>
      <img
        id={bean.pictureURL}
        src={imageSrc}
        alt={bean.pictureURL}
        className={classes.cover}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary">
            {bean.storeName ? bean.storeName : ""}
            <ShoppingCartIcon />
          </Typography>
          <div className={classes.coffeeName}>
            <Avatar className={classes.avatar} />
            <Typography component="h3" variant="h5" className={classes.bold}>
              {bean.coffeeName ? bean.coffeeName : ""}
            </Typography>
          </div>
          <Typography variant="subtitle1" color="textSecondary">
            subtitle
          </Typography>
          <div className={classes.chips}>
            {bean.flavorLevel1Descriptors.map((flavor, index) => (
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
  );
};

BeanListItem.propTypes = {
  id: PropTypes.string,
};

export default BeanListItem;