import PropTypes from "prop-types";
import React from "react";

import Pagination from "./buttons.js";
import Wheel from "./wheel.js";
import ButtonBases from "./complex_button.js";
import Steppers from "./stepper.js";
import Tabs from "./tab.js";

class Selector extends React.Component {
  renderWheel() {
    const tiles = this.props.tiles;
    const flavorNames = tiles.map((tile) => tile.flavor.name);
    const selectedFlavorNames = tiles
      .filter((tile) => tile.selected)
      .map((tile) => tile.flavor.name);
    return (
      <Wheel
        flavorNames={flavorNames}
        selectedFlavorNames={selectedFlavorNames}
        level={this.props.page}
        onClick={(page, flavorName) => this.props.onClickTile(page, flavorName)}
      />
    );
  }

  render() {
    return (
      <div className="app">
        <div className="tabs">
          <Tabs />
        </div>
        <div className="complex_button">
          <ButtonBases />
        </div>
        <div className="app-board">{this.renderWheel()}</div>

        <div className="pagination">
          <Pagination
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
        <div className="stepppers">
          <Steppers />
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

export default Selector;
