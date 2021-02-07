import PropTypes from "prop-types";
import React from "react";
import ButtonBases from "./complex_button.js";

function Flavor(props) {
  const style = props.selected ? { backgroundColor: "yellow" } : {};
  return (
    <ButtonBases
      className="flavor"
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
