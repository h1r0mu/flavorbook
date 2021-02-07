import PropTypes from "prop-types";
import React from "react";

import Flavor from "./flavor.js";

Wheel.propTypes = {
  tiles: PropTypes.array,
  onClick: PropTypes.func,
  level: PropTypes.number,
  url: PropTypes.array,
};

export default function Wheel(props) {
  const selectedFlavorNames = props.tiles
    .filter((tile) => tile.selected)
    .map((tile) => tile.name);

  return (
    <div className="flavors">
      {props.tiles.map((tile) => (
        <div key={tile.flavor.name} className="flavor-row">
          <Flavor
            key={tile.flavor.name}
            value={tile.flavor.name}
            selected={selectedFlavorNames.includes(tile.flavor.name)}
            url={tile.flavor.url}
            onClick={
              props.onClick
                ? () => props.onClick(props.level, tile.flavor.name)
                : null
            }
          />
        </div>
      ))}
    </div>
  );
}
