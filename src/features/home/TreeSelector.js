import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
  start: {
    fontSize: 50,
  },
});

export default function FileSystemNavigator() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon style={{ fontSize: 50 }} />}
      defaultExpandIcon={<ChevronRightIcon style={{ fontSize: 50 }} />}
    >
      <div className={classes.start}>
        <TreeItem
          nodeId="1"
          label={<Typography className={classes.start}>Start</Typography>}
        >
          <Link to={"/sign-up"} style={{ color: "black" }}>
            <TreeItem
              nodeId="2"
              label={<Typography className={classes.start}>Sign up</Typography>}
            />
          </Link>
          <Link to={"/login"} style={{ color: "black" }}>
            <TreeItem
              nodeId="3"
              label={<Typography className={classes.start}>Login</Typography>}
            />
          </Link>
          <Link to={"/selection"} style={{ color: "black" }}>
            <TreeItem
              nodeId="4"
              label={
                <Typography className={classes.start}>
                  Select Flavors
                </Typography>
              }
            />
          </Link>
        </TreeItem>
      </div>
    </TreeView>
  );
}
