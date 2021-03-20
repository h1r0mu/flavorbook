import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Image from "../data/etiopia.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    display: "flex",
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    display: "flex",
    width: theme.spacing(30),
    height: theme.spacing(30),
    margin: "auto",
    marginTop: theme.spacing(20),
  },
}));

export default function ImageAvatars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="Remy Sharp" src={Image} className={classes.small} />
    </div>
  );
}
