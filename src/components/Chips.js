import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";
import CreateIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Create";
import PropTypes from "prop-types";
import React from "react";

// メンバーページのEditとCreateチップ

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
      maxWidth: 300,
      minWidth: 200,
      maxHeight: 40,
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff8f00",
    },
    secondary: {
      main: "#eeeeee",
    },
  },
});

export default function Chips(props) {
  const classes = useStyles();

  const handleIcon = (pattern) => {
    switch (pattern) {
      case "Create":
        return <CreateIcon />;
      case "Edit":
        return <EditIcon />;
      default:
        return <p>no icon</p>;
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Chip
          icon={handleIcon(props.pattern)}
          label={props.name}
          clickable
          color={props.color}
        />
      </div>
    </MuiThemeProvider>
  );
}

Chips.propTypes = {
  pattern: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
};
