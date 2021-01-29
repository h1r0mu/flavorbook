import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PrevButton = (props) => {
  return (
    <Link to={props.page}>
      <button>{"Prev"}</button>
    </Link>
  );
};
const NextButton = (props) => {
  return (
    <Link to={props.page}>
      <button>{"Next"}</button>
    </Link>
  );
};
const Pagination = (props) => {
  const buttons = [];
  if (props.prev !== undefined) {
    buttons.push(<PrevButton key="prev" page={props.prev} />);
  }
  if (props.next !== undefined) {
    buttons.push(<NextButton key="next" page={props.next} />);
  }
  return buttons;
};

NextButton.propTypes = {
  page: PropTypes.string,
};
PrevButton.propTypes = {
  page: PropTypes.string,
};

export default Pagination;
