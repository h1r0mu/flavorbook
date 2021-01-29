import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import Selector from "./selector.js";
import Result from "./result.js";

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
          selected: false,
        };
      }),
    };
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route
              path="/"
              exact
              render={() => (
                <Selector tiles={this.state.tiles} page={0} next="/page2" />
              )}
            />
            <Route
              path="/page2"
              render={() => (
                <Selector
                  tiles={this.state.tiles}
                  page={1}
                  next="/page3"
                  prev="/"
                />
              )}
            />
            <Route
              path="/page3"
              render={() => (
                <Selector
                  tiles={this.state.tiles}
                  page={2}
                  next="/page4"
                  prev="/page2"
                />
              )}
            />
            <Route
              path="/page4"
              render={() => (
                <Result
                  tiles={this.state.tiles}
                  page={3}
                  next="/"
                  prev="/page3"
                />
              )}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
