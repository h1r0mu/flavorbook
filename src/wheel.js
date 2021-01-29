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
        onClick={() =>
          this.props.onClick(this.props.flavorNames[i], this.props.level)
        }
      />
    );
  }

  render() {
    let flavors = [];
    const num = this.props.flavorNames.length;
    for (let i = 0; i < Math.floor(num / this.width) + 1; i++) {
      let rows = [];
      for (let j = 0; j < this.width && i * this.width + j < num; j++) {
        rows.push(this.renderFlavor(i * this.width + j));
      }
      flavors.push(
        <div key={i} className="board-row">
          {rows}
        </div>
      );
    }

    return <div>{flavors}</div>;
  }
}
Wheel.propTypes = {
  flavorNames: PropTypes.array,
  selectedFlavorNames: PropTypes.array,
  onClick: PropTypes.func,
  level: PropTypes.number,
};

export default Wheel;
