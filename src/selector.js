import PropTypes from "prop-types";
import React from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme } from "@material-ui/core/styles";
import "typeface-roboto";
import { ThemeProvider } from "@material-ui/styles";

import Wheel from "./wheel.js";

const theme = createMuiTheme({
  typography: {
    h1: {
      marginTop: 40,
      marginLeft: 40,
      fontSize: 35,
    },
  },
});

export default function Selector(props) {
  const classes = useStyles();
  let { level } = useParams();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Wheel
              tiles=props.tiles
							level={level}
              onClick={props.handleClick}
            />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

Selector.propTypes = {
  tiles: PropTypes.array,
  level: PropTypes.number,
  handleClick: PropTypes.func,
};
