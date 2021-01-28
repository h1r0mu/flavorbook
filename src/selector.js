import PropTypes from "prop-types";
import React from "react";

import Pagination from "./buttons.js";
import Wheel from "./wheel.js";

class Flavor {
  constructor(name, level, parentName) {
    this.name = name;
    this.level = level;
    this.parentName = parentName;
  }
}

const flavorNames = [
  ["野菜", 0, null],
  ["酸味／発酵", 0, null],
  ["豆臭い", 1, "野菜"],
  ["植物／野菜", 1, "野菜"],
  ["生野菜", 1, "野菜"],
  ["オリーブオイル", 1, "野菜"],
  ["酒／発酵", 1, "酸味／発酵"],
  ["ハーブ", 2, "植物／野菜"],
  ["干し草", 2, "植物／野菜"],
  ["植物", 2, "植物／野菜"],
  ["ホウレンソウ", 2, "植物／野菜"],
  ["生鮮野菜", 2, "植物／野菜"],
  ["さやえんどう", 2, "植物／野菜"],
  ["未成熟な野菜", 2, "植物／野菜"],
];

class Selector extends React.Component {
  constructor(props) {
    super(props);
    const flavors = flavorNames.map((flavor) => new Flavor(...flavor));
    this.state = {
      tiles: flavors.map((flavor) => {
        return {
          flavor: flavor,
          selected: true,
        };
      }),
    };
  }

  selectTilesAt(level) {
    return this.state.tiles.filter((tile) => tile.flavor.level == level);
  }

  handleClick(i) {
    const tiles = this.state.tiles.slice();
    tiles[i].selected = !tiles[i].selected;
    this.setState({ tiles: tiles });
  }

  renderWheel() {
    let tiles = this.selectTilesAt(this.props.page);
    if (this.props.page > 0) {
      const selectedParentFlavorNames = this.selectTilesAt(this.props.page - 1)
        .filter((tile) => tile.selected)
        .map((tile) => tile.name);
      tiles = tiles.filter((tile) =>
        selectedParentFlavorNames.includes(tile.parentName)
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
  page: PropTypes.number,
  prev: PropTypes.string,
  next: PropTypes.string,
};

// ========================================

export default Selector;
