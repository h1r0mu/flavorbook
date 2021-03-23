import { Slider as MuiSlider } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function valueText(value) {
  return `${value}°C`;
}

export default function Slider(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiSlider
        defaultValue={50}
        getAriaValueText={valueText}
        aria-labelledby="discrete-slider-always"
        step={5}
        marks={props.marks}
        valueLabelDisplay="on"
      />
    </div>
  );
}

Slider.propTypes = {
  marks: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};
