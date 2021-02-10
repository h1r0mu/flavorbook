import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import TreeSelector from "./tree_selecter.js";

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
const useStyles = makeStyles(() => ({
  content: {
    position: "relative",
    minHeight: 300,
    maxHeight: 800,
    overflow: "hidden",
    marginBottom: 500,
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    objectFit: "cover",
    transform: "translate(-50%,-50%)",
    zIndex: -1,
    filter: "grayscale(80%)",
  },
  h1: {
    marginTop: 50,
    marginLeft: 20,
    fontSize: 100,
  },
  start: {
    position: "relative",
    marginTop: 200,
    marginLeft: 900,
  },
}));

export default function Login() {
  const classes = useStyles();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <video
          src="/static/videos/coffee.mp4"
          loop
          muted
          autoPlay
          className={classes.video}
        ></video>
        <h1 className={classes.h1}> Coffee Flavors</h1>
        <div className={classes.start}>
          <TreeSelector />
        </div>
      </ThemeProvider>
    </div>
  );
}
