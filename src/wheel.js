import PropTypes from "prop-types";
import React from "react";

import Flavor from "./flavor.js";

class Wheel extends React.Component {
  renderFlavor(i) {
    return <Flavor key={i} value={this.props.flavors[i].name} />;
  }

  render() {
    let flavors = [];
    for (let i = 0; i < 3; i++) {
      let rows = [];
      for (let j = 0; j < 3; j++) {
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
  flavors: PropTypes.array,
};

export default Wheel;
