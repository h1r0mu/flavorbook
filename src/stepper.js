import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#795548",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 8,
    width: "100%",
  },

  button: {
    marginTop: 50,
    marginLeft: 100,
    marginRight: 100,
    // marginRight: theme.spacing(1),
  },

  instructions: {
    marginTop: 100,
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Select Coffee Flavors ( Level1 )",
    "Select Coffee Flavors ( Level2 )",
    "Select Coffee Flavors ( Level3 )",
    "Register Coffee Flavors",
  ];
}

const PrevButton = (props) => {
  const classes = useStyles();
  return (
    <Link to={props.page}>
      <Button
        disabled={props.now === 0}
        onClick={props.onClick}
        className={classes.button}
        color="primary"
        variant="contained"
      >
        {"Back"}
      </Button>
    </Link>
  );
};

const NextButton = (props) => {
  const classes = useStyles();
  return (
    <Link to={props.page}>
      <Button
        onClick={props.onClick}
        className={classes.button}
        color="primary"
        variant="contained"
      >
        {"Next"}
      </Button>
    </Link>
  );
};

const ResetButton = (props) => {
  const classes = useStyles();
  return (
    <Link to={0}>
      <Button disabled={props.now === 0} className={classes.button}>
        {"Reset"}
      </Button>
    </Link>
  );
};

const HorizontalLinearStepper = (props) => {
  const classes = useStyles();
  const steps = getSteps();
  const buttons = [];
  if (props.prev !== undefined) {
    buttons.push(
      <PrevButton
        key="prev"
        page={props.prev}
        now={props.page}
        onClick={props.onClickPrev}
      />
    );
  }
  if (props.next !== undefined) {
    buttons.push(
      <NextButton
        key="next"
        page={props.next}
        now={props.page}
        onClick={props.onClickNext}
      />
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Stepper activeStep={props.page}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {props.page === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <ResetButton key="reset" now={props.page} />
            </div>
          ) : (
            <div>
              <div>{buttons}</div>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

HorizontalLinearStepper.propTypes = {
  page: PropTypes.number,
  prev: PropTypes.string,
  next: PropTypes.string,
  onClickPrev: PropTypes.func,
  onClickNext: PropTypes.func,
};

ResetButton.propTypes = {
  now: PropTypes.number,
};

NextButton.propTypes = {
  page: PropTypes.string,
  now: PropTypes.number,
  onClick: PropTypes.func,
};

PrevButton.propTypes = {
  page: PropTypes.string,
  now: PropTypes.number,
  onClick: PropTypes.func,
};

export default HorizontalLinearStepper;
