import PropTypes from "prop-types";
import React from "react";

import Flavor from "./flavor.js";

class Wheel extends React.Component {
  renderFlavor(i) {
    return (
      <Flavor
        key={i}
        value={this.props.flavorNames[i]}
        selected={this.props.selectedFlavorNames.includes(
          this.props.flavorNames[i]
        )}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let flavors = [];
    const num = this.props.flavorNames.length;
    for (let i = 0; i < Math.floor(num / 3) + 1; i++) {
      let rows = [];
      for (let j = 0; j < 3 && i * 3 + j < num; j++) {
        rows.push(this.renderFlavor(i * 3 + j));
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
};

export default Wheel;
