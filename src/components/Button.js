import { makeStyles } from "@material-ui/core/styles";
import { Button as MuiButton } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Button(props) {
  const classes = useStyles();
  return (
    <MuiButton
      variant="contained"
      color="primary"
      size={props.size ? props.size : "small"}
      className={classes.button}
      startIcon={props.icon ? props.icon : null}
      onClick={props.onClick}
    >
      {props.text}
    </MuiButton>
  );
}
