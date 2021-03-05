import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Slider as MuiSlider} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));


function valuetext(value) {
  return `${value}°C`;
}

export default function Slider(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiSlider
        defaultValue={50}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={5}
        marks={props.marks}
        valueLabelDisplay="on"
      />
    </div>
  );
}
