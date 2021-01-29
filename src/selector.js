import PropTypes from "prop-types";
import React from "react";

import Pagination from "./buttons.js";
import Wheel from "./wheel.js";

class Selector extends React.Component {
  selectTilesAt(level) {
    return this.props.tiles.filter((tile) => tile.flavor.level == level);
  }

  handleClick(flavorName) {
    const tiles = this.props.tiles.slice();
    const tile = tiles.find((tile) => tile.flavor.name == flavorName);
    tile.selected = !tile.selected;
    this.setState({ tiles: tiles });
  }

  renderWheel() {
    let tiles = this.selectTilesAt(this.props.page);
    if (this.props.page > 0) {
      const selectedParentFlavorNames = this.selectTilesAt(this.props.page - 1)
        .filter((tile) => tile.selected)
        .map((tile) => tile.flavor.name);
      tiles = tiles.filter((tile) =>
        selectedParentFlavorNames.includes(tile.flavor.parentName)
      );
    }
    const flavorNames = tiles.map((tile) => tile.flavor.name);
    const selectedFlavorNames = tiles
      .filter((tile) => tile.selected)
      .map((tile) => tile.flavor.name);
    return (
      <Wheel
        flavorNames={flavorNames}
        selectedFlavorNames={selectedFlavorNames}
        onClick={(i) => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="app">
        <div className="app-board">{this.renderWheel(this.props.page)}</div>
        <div className="pagination">
          <Pagination
            page={this.props.page}
            prev={this.props.prev}
            next={this.props.next}
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
};

// ========================================

export default Selector;
