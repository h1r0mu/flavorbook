import PropTypes from "prop-types";
import React from "react";

import Pagination from "./buttons.js";
import Wheel from "./wheel.js";
import StoreInfo from "./forms.js";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: null,
      country: null,
      region: null,
      processing: null,
      grind: null,
      brewing: null,
      days: null,
      tiles: props.tiles.slice(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.restore = this.restore.bind(this);
  }
  save() {
    const key = Object.keys(this.state)
      .map((k) => {
        return k != "tiles" ? this.state[k] : "";
      })
      .join("_");
    let history = localStorage.getItem("flavorBook")
      ? JSON.parse(localStorage.getItem("flavorBook"))
      : {};
    Object.assign(history, { [key]: { ...this.state } });
    localStorage.setItem("flavorBook", JSON.stringify(history));
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  renderWheel() {
    const tiles = this.state.tiles;
    const flavorNames = tiles.map((tile) => tile.flavor.name);
    const selectedFlavorNames = tiles
      .filter((tile) => tile.selected)
      .map((tile) => tile.flavor.name);
    return (
      <Wheel
        flavorNames={flavorNames}
        selectedFlavorNames={selectedFlavorNames}
        level={this.props.page}
      />
    );
  }
  restore(history) {
    this.setState(history);
  }

  renderResult() {
    return <div>{this.renderWheel()}</div>;
  }
  renderHistory() {
    if (!localStorage.getItem("flavorBook")) {
      return;
    }
    const histories = JSON.parse(localStorage.getItem("flavorBook"));
    const buttons = [];

    Object.keys(histories).forEach((key) => {
      buttons.push(
        <button key={key} onClick={() => this.restore(histories[key])}>
          {key}
        </button>
      );
    });
    return buttons;
  }

  convert() {
    const tiles = this.state.tiles;
    const top = tiles
      .filter((tile) => tile.flavor.level == 0)
      .map((tile) => tile.flavor.name)
      .join("や");
    const middle = tiles
      .filter((tile) => tile.flavor.level == 1)
      .map((tile) => tile.flavor.name)
      .join("，");
    const bottom = tiles
      .filter((tile) => tile.flavor.level == 2)
      .map((tile) => tile.flavor.name)
      .join("，");
    const delimiter = ["などの複雑なフレーバー，", "の強い香りと"][
      Math.floor(Math.random() * 2)
    ];
    let notes = top;
    notes += middle ? delimiter + middle : "";
    notes += bottom ? `，微かに${bottom}` : "";
    notes += "の香りを感じます．";
    return notes;
  }

  render() {
    return (
      <div className="app">
        <h1>あなたの感じた香り一覧</h1>
        <div className="app-board">{this.renderResult()}</div>
        <h1>バリスタ語への翻訳結果</h1>
        <div>
          <p>{this.convert()}</p>
        </div>
        <div>
          <StoreInfo handleChange={this.handleChange} />
        </div>
        <button onClick={this.save}>保存</button>
        <div>{this.renderHistory()}</div>
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
Result.propTypes = {
  tiles: PropTypes.array,
  page: PropTypes.number,
  prev: PropTypes.string,
  next: PropTypes.string,
  onClickPrev: PropTypes.func,
  onClickNext: PropTypes.func,
};

export default Result;
