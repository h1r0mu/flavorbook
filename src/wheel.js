import React from "react";
import Flavor from "./flavor.js";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  list: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default function Wheel(props) {
  const selectedFlavorNames = props.tiles
    .filter((tile) => tile.selected)
    .map((tile) => tile.name);

  const classes = useStyles();

  return (
    <div className="flavors">
      {props.tiles.map((tile) => (
        <div key={tile.flavor.name} className={classes.list}>
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

Wheel.propTypes = {
  tiles: PropTypes.array,
  onClick: PropTypes.func,
  level: PropTypes.number,
  url: PropTypes.array,
};

