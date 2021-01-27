import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Pagination from "./pagination.js";
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

class App extends React.Component {
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
    // const tiles = this.state.tiles.slice();
    // const i = tiles.findIndex(tile => tile.flavor.name == '野菜')
    // tiles[i].selected = true
    // this.setState({
    // tiles: tiles
    // })
  }

  selectTilesAt(level) {
    return this.state.tiles.filter((tile) => tile.flavor.level == level);
  }

  renderWheel(level) {
    let tiles = this.selectTilesAt(level);
    if (level > 0) {
      const selectedParentFlavorNames = this.selectTilesAt(level - 1)
        .filter((tile) => tile.selected)
        .map((tile) => tile.name);
      tiles = tiles.filter((tile) =>
        selectedParentFlavorNames.includes(tile.parentName)
      );
    }
    const flavorNames = tiles.map((tile) => tile.flavor.name);
    return <Wheel flavors={flavorNames} />;
  }

  render() {
    return (
      <div className="app">
        <div className="app-board">{this.renderWheel(0)}</div>
        <div className="pagination">
          <Pagination />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
