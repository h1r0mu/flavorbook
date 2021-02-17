import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import PropTypes from "prop-types";
import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 8,
    width: "100%",
  },

  button: {
    marginTop: 50,
    marginLeft: 100,
    marginRight: 100,
  },

  instructions: {
    marginTop: 100,
    marginBottom: theme.spacing(1),
  },
}));

const HorizontalLinearStepper = (props) => {
  const classes = useStyles();

  const steps = [
    "Select Coffee Flavors ( Level1 )",
    "Select Coffee Flavors ( Level2 )",
    "Select Coffee Flavors ( Level3 )",
    "Register Coffee Flavors",
  ];
  return (
    <div className={classes.root}>
      <Stepper activeStep={props.level}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>{props.children}</div>
    </div>
  );
};

HorizontalLinearStepper.propTypes = {
  level: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};

export default HorizontalLinearStepper;
