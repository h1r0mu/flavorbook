import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

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
          <TreeItem
            nodeId="2"
            label={<Typography className={classes.start}>Register</Typography>}
          />
          <TreeItem
            nodeId="3"
            label={<Typography className={classes.start}>Login</Typography>}
          />
          <Link to={"/page1"} style={{ color: "black" }}>
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
