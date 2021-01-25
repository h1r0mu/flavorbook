import PropTypes from "prop-types";
import React from "react";

function Flavor(props) {
  return <button className="flavor">{props.value}</button>;
}
Flavor.propTypes = {
  value: PropTypes.string,
};
export default Flavor;
