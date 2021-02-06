import PropTypes from "prop-types";
import React from "react";
import AppBar from "./appBar.js";
import Wheel from "./wheel.js";
import Steppers from "./stepper.js";

Selector.propTypes = {
  tiles: PropTypes.array,
  page: PropTypes.number,
  prev: PropTypes.string,
  next: PropTypes.string,
  onClickTile: PropTypes.func,
  onClickPrev: PropTypes.func,
  onClickNext: PropTypes.func,
};

// ========================================

export default function Selector(props) {
  return (
    <div className="app">
      <div className="tabs">
        <AppBar />
      </div>
      <div className="app-board">
        <Wheel
          tiles={props.tiles}
          level={props.page}
          onClick={props.onClickTile}
        />
      </div>
      <div className="stepppers">
        <Steppers
          page={props.page}
          prev={props.prev}
          next={props.next}
          onClickPrev={() => (props.onClickPrev ? props.onClickPrev() : null)}
          onClickNext={() => (props.onClickNext ? props.onClickNext() : null)}
        />
      </div>
    </div>
  );
}
