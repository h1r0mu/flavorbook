import PropTypes from "prop-types";
import React from "react";

import Pagination from "./buttons.js";
import Wheel from "./wheel.js";

class Selector extends React.Component {
  selectTilesAt(level) {
    return this.props.tiles
      .slice()
      .filter((tile) => tile.flavor.level == level);
  }

  handleClick(flavorName, level) {
    const tiles = this.props.tiles.slice();
    const tile = tiles.find(
      (tile) => tile.flavor.name == flavorName && tile.flavor.level == level
    );
    tile.selected = !tile.selected;
    this.setState({ tiles: tiles });
  }

  getVisibleTiles() {
    let tiles = this.selectTilesAt(this.props.page);
    if (this.props.page > 0) {
      const selectedParentFlavorNames = this.selectTilesAt(this.props.page - 1)
        .filter((tile) => tile.selected)
        .map((tile) => tile.flavor.name);
      tiles = tiles.filter((tile) =>
        selectedParentFlavorNames.includes(tile.flavor.parentName)
      );
    }
    return tiles;
  }

  componentDidMount() {
    const isSelected = (tile) => tile.selected;
    let tiles = this.getVisibleTiles();
    tiles = tiles.some(isSelected)
      ? tiles
      : tiles.map((tile) => {
          tile.selected = true;
          return tile;
        });
    this.setState({ tiles: tiles });
  }

  renderWheel() {
    const tiles = this.getVisibleTiles();
    const flavorNames = tiles.map((tile) => tile.flavor.name);
    const selectedFlavorNames = tiles
      .filter((tile) => tile.selected)
      .map((tile) => tile.flavor.name);
    return (
      <Wheel
        flavorNames={flavorNames}
        selectedFlavorNames={selectedFlavorNames}
        level={this.props.page}
        onClick={(flavorName, level) => this.handleClick(flavorName, level)}
      />
    );
  }

  resetSelection() {
    const tiles = this.selectTilesAt(this.props.page)
      .filter((tile) => tile.selected)
      .filter((tile) => tile.flavor.level === this.props.page)
      .map((tile) => {
        tile.selected = false;
        return tile;
      });
    this.setState({ tiles: tiles });
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
            onClick={() => this.resetSelection()}
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
  onClick: PropTypes.func,
};

// ========================================

export default Selector;
