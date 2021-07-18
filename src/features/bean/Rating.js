import {
  SentimentDissatisfied as SentimentDissatisfiedIcon,
  SentimentSatisfiedAlt as SentimentSatisfiedAltIcon,
  SentimentSatisfied as SentimentSatisfiedIcon,
  SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
  SentimentVerySatisfied as SentimentVerySatisfiedIcon,
} from "@material-ui/icons";

import { Rating as MuiRating } from "@material-ui/lab";
import PropTypes from "prop-types";
import React from "react";
import { update } from "./beanSlice.js";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    width: "50%",
    marginLeft: "3%",
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function Slider({ name }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <MuiRating
      className={classes.root}
      name="customized-icons"
      defaultValue={0}
      getLabelText={(value) => customIcons[value].label}
      IconContainerComponent={IconContainer}
      onChange={(event, value) => dispatch(update(name, value))}
      size="large"
    />
  );
}

IconContainer.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Slider.propTypes = {
  name: PropTypes.PropTypes.string.isRequired,
};
