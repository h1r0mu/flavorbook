import { Slider as MuiSlider } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "50%",
    marginLeft: "3%",
  },
}));


export default function Slider(props) {
  const classes = useStyles();

  return (
    <MuiSlider
      className={classes.root}
      min={0}
      max={10}
      step={1}
      defaultValue={5}
      marks={props.marks}
      valueLabelDisplay="auto"
    />
  );
}

Slider.propTypes = {
  marks: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};
