import Avatar from "@material-ui/core/Avatar";
import { Chip as MuiChip } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chip(props) {
  const classes = useStyles();

  return (
    <MuiChip
      className={classes.root}
      avatar={<Avatar alt={props.label} src={props.imagePath} />}
      clickable
      {...props}
    />
  );
}

Chip.propTypes = {
  label: PropTypes.string,
  imagePath: PropTypes.string,
};
