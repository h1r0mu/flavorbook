import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import TreeSelector from "./TreeSelector.js";

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

export default function Home() {
  const classes = useStyles();

  return (
    <div>
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
    </div>
  );
}
