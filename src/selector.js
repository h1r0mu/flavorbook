import PropTypes from "prop-types";
import React from "react";
import AppBar from "./appBar.js";
import Wheel from "./wheel.js";
import Steppers from "./stepper.js";

class Selector extends React.Component {
  renderWheel() {
    const tiles = this.props.tiles;
    const flavorNames = tiles.map((tile) => tile.flavor.name);
    const url = tiles.map((tile) => tile.flavor.url);
    const selectedFlavorNames = tiles
      .filter((tile) => tile.selected)
      .map((tile) => tile.flavor.name);
    return (
      <Wheel
        flavorNames={flavorNames}
        selectedFlavorNames={selectedFlavorNames}
        level={this.props.page}
        url={url}
        onClick={(page, flavorName) => this.props.onClickTile(page, flavorName)}
      />
    );
  }

  render() {
    return (
      <div className="app">
        <div className="tabs">
          <AppBar />
        </div>
        <div className="app-board">{this.renderWheel()}</div>
        <div className="stepppers">
          <Steppers
            page={this.props.page}
            prev={this.props.prev}
            next={this.props.next}
            onClickPrev={() =>
              this.props.onClickPrev ? this.props.onClickPrev() : null
            }
            onClickNext={() =>
              this.props.onClickNext ? this.props.onClickNext() : null
            }
          />
        </div>
      </div>
    );
  }
}

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

  function renderWheel() {
    const flavorNames = props.tiles.map((tile) => tile.flavor.name);
    const selectedFlavorNames = props.tiles
      .filter((tile) => tile.selected)
      .map((tile) => tile.flavor.name);
    return (
      <Wheel
        flavorNames={flavorNames}
        selectedFlavorNames={selectedFlavorNames}
        level={props.page}
        onClick={(page, flavorName) => props.onClickTile(page, flavorName)}
      />
    );
  }

  return (
    <div className="app">
      <div className="tabs">
        <AppBar />
      </div>
      <div className="app-board">{renderWheel()}</div>
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
