import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PrevButton = (props) => {
  return (
    <Link to={props.page}>
      <button onClick={props.onClick}>{"前へ"}</button>
    </Link>
  );
};
const NextButton = (props) => {
  return (
    <Link to={props.page}>
      <button>{"次へ"}</button>
    </Link>
  );
};
const Pagination = (props) => {
  const buttons = [];
  if (props.prev !== undefined) {
    buttons.push(
      <PrevButton key="prev" page={props.prev} onClick={props.onClick} />
    );
  }
  if (props.next !== undefined) {
    buttons.push(<NextButton key="next" page={props.next} />);
  }
  return buttons;
};

NextButton.propTypes = {
  page: PropTypes.string,
  onClick: PropTypes.func,
};
PrevButton.propTypes = {
  page: PropTypes.string,
  onClick: PropTypes.func,
};

export default Pagination;
