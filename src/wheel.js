import PropTypes from "prop-types";
import React from "react";

import Flavor from "./flavor.js";

class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.width = 9;
  }
  renderFlavor(i) {
    return (
      <Flavor
        key={i}
        value={this.props.flavorNames[i]}
        selected={this.props.selectedFlavorNames.includes(
          this.props.flavorNames[i]
        )}
        url={this.props.url[i]}
        onClick={() =>
          this.props.onClick
            ? this.props.onClick(this.props.level, this.props.flavorNames[i])
            : null
        }
      />
    );
  }

  render() {
    let flavors = [];
    const num = this.props.flavorNames.length;
    for (let i = 0; i < num; i++) {
      flavors.push(
        <div key={i} className="board-row">
          {this.renderFlavor(i)}
        </div>
      );
    }

    return <div className="flavors">{flavors}</div>;
  }
}
Wheel.propTypes = {
  flavorNames: PropTypes.array,
  selectedFlavorNames: PropTypes.array,
  onClick: PropTypes.func,
  level: PropTypes.number,
  url: PropTypes.array,
};

export default function Wheel(props) {
  return (
    <div className="flavors">
      {props.flavorNames.map((flavorName) => (
        <div key={flavorName} className="flavor-row">
          <Flavor
            key={flavorName}
            value={flavorName}
            selected={props.selectedFlavorNames.includes(flavorName)}
            onClick={
              props.onClick
                ? () => props.onClick(props.level, flavorName)
                : null
            }
          />
        </div>
      ))}
    </div>
  );
}
