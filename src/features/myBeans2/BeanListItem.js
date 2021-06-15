import { React, useEffect, useState } from "react";
import { deleteBean, selectBeanById } from "./beansSlice";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "./Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "./Chips";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../../firebase";

const useStyles = makeStyles(() => ({
  root: {
    width: 800,
    display: "flex",
    margin: "auto",
    marginTop: 10,
    marginLeft: 20,
    backgroundColor: "white",
    borderRadius: 8,
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
    width: 150,
    height: 200,
    borderRadius: 5,
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
    marginRight: 100,
  },
}));

const BeanListItem = ({ id, editable }) => {
  const classes = useStyles();
  const bean = useSelector((state) => selectBeanById(state, id));
  const [imageSrc, setImageSrc] = useState(null);
  const dispatch = useDispatch();

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

  const onDelete = async () => {
    await dispatch(deleteBean(bean.id));
  };

  return (
    <Card className={classes.root} key={id}>
      <img
        id={bean.picture_url}
        src={imageSrc}
        alt={bean.picture_url}
        className={classes.cover}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary">
            {bean.store ? bean.store : ""}
            <ShoppingCartIcon />
          </Typography>
          <div className={classes.coffee}>
            <Avatar className={classes.avatar} />
            <Typography component="h3" variant="h5" className={classes.bold}>
              {bean.coffee ? bean.coffee : ""}
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
        <CardActions>
          {editable ? (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={onDelete}
            >
              Delete
            </Button>
          ) : null}
        </CardActions>
      </div>
    </Card>
  );
};

BeanListItem.propTypes = {
  id: PropTypes.string,
  editable: PropTypes.bool,
};

export default BeanListItem;
