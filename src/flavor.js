import PropTypes from "prop-types";
import React from "react";

function Flavor(props) {
  const style = props.selected ? { backgroundColor: "yellow" } : {};
  return (
    <button className="flavor" style={style} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
Flavor.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};
export default Flavor;
