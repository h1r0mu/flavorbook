import PropTypes from "prop-types";
import React from "react";

import Pagination from "./buttons.js";

const Result = (props) => {
  return (
    <div className="app">
      <div className="pagination">
        <Pagination page={props.page} prev={props.prev} next={props.next} />
      </div>
    </div>
  );
};
Result.propTypes = {
  page: PropTypes.number,
  prev: PropTypes.string,
  next: PropTypes.string,
};

export default Result;
