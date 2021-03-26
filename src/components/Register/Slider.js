import { Slider as MuiSlider } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { descriptorUpdate } from "./beanSlice.js";
import { descriptorValueEnum } from "./beanSlice.js";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    width: "50%",
    marginLeft: "3%",
  },
}));

export default function Slider({ name, marks }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <MuiSlider
      className={classes.root}
      min={descriptorValueEnum.MIN}
      max={descriptorValueEnum.MAX}
      step={1}
      defaultValue={descriptorValueEnum.DEFAULT}
      marks={marks}
      valueLabelDisplay="off"
      onChangeCommitted={(event, value) =>
        dispatch(descriptorUpdate(name, value))
      }
    />
  );
}

Slider.propTypes = {
  name: PropTypes.PropTypes.string.isRequired,
  marks: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
};
