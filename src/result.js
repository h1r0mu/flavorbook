import PropTypes from "prop-types";
import React from "react";
import Steppers from "./stepper.js";
import Wheel from "./wheel.js";
import StoreInfo from "./forms.js";

class Result extends React.Component {
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
      />
    );
  }

  renderResult() {
    return <div>{this.renderWheel()}</div>;
  }

  convert() {
    const tiles = this.props.tiles;
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
          <StoreInfo />
        </div>
        <button>保存</button>
								<div className="stepppers">
										<Steppers
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
