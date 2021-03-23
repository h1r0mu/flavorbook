import React from "react";
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import CreateIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Create";

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
