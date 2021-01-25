import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Pagination from "./pagination.js";
import Wheel from "./wheel.js";
// import App2 from './level2';

const flavor_names = [
  "野菜",
  "酸味/発酵",
  "フルーツ",
  "花",
  "甘味",
  "ナッツココア",
  "香辛料",
  "焼き",
  "その他",
];

class App extends React.Component {
  constructor(props) {
    super(props);
    const flavors = flavor_names.map((name) => {
      return {
        name: name,
        selected: false,
      };
    });
    this.state = {
      flavors: flavors,
    };
  }

  render() {
    return (
      <div className="service">
        <div className="service-board">
          <Wheel flavors={this.state.flavors} />
        </div>
        <div className="pagination">
          <Pagination />
        </div>
      </div>
    );
  }
}

// ========================================

// ReactDOM.render(<App2 />, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"));
