import PropTypes from "prop-types";
import React from "react";
import AppBar from "./appBar.js";
import Wheel from "./wheel.js";
import Steppers from "./stepper.js";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    h1: {
      marginTop: 40,
      fontSize: 50,
    },
  },
});

const useStyles = makeStyles(() => ({
  app: {
    backgroundColor: "transparent",
  },
}));

export default function Selector(props) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <AppBar />
        <Typography variant="h1" gutterBottom>
          感じない香りを選択してください
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Wheel
              tiles={props.tiles}
              level={props.page}
              onClick={props.onClickTile}
            />
          </Grid>
        </Grid>
        <Steppers
          page={props.page}
          prev={props.prev}
          next={props.next}
          onClickPrev={() => (props.onClickPrev ? props.onClickPrev() : null)}
          onClickNext={() => (props.onClickNext ? props.onClickNext() : null)}
        />
      </div>
    </ThemeProvider>
  );
}

Selector.propTypes = {
  tiles: PropTypes.array,
  page: PropTypes.number,
  prev: PropTypes.string,
  next: PropTypes.string,
  onClickTile: PropTypes.func,
  onClickPrev: PropTypes.func,
  onClickNext: PropTypes.func,
};
