import PropTypes from "prop-types";
import React from "react";

function Flavor(props) {
  return <button className="flavor" 
		onClick={props.onClick}>
				{props.value}
				</button>;
}
Flavor.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};
export default Flavor;
