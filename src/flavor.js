import PropTypes from "prop-types";
import React from "react";
import ButtonBases from "./complex_button.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  // css設定
  root: {
    marginTop: 70,
    marginLeft: 0,
    marginBottom: 70,
    display: "flex",
    flexWrap: "wrap",
    minWidth: 200,
    width: "100%",
  },
  flavor: {
    dsplay: "flex",
  },
}));

function Flavor(props) {
  const style = props.selected ? { backgroundColor: "yellow" } : {};
  const classes = useStyles();
  return (
    <ButtonBases
      className={classes.flavor}
      style={style}
      onClick={props.onClick}
      value={props.value}
      url={props.url}
      disabled={!props.onClick ? true : false}
    />
  );
}
Flavor.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  url: PropTypes.string,
};
export default Flavor;
