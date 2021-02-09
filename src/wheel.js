import React from "react";
import Flavor from "./flavor.js";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { GridListTile } from "@material-ui/core";
import { GridList } from "@material-ui/core";

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
      <GridList cellHeight="auto" cols="auto">
        {props.tiles.map((tile) => (
          <GridListTile key={tile.flavor.name} cols="1">
            <Flavor
              className={classes.list}
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
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

Wheel.propTypes = {
  tiles: PropTypes.array,
  onClick: PropTypes.func,
  level: PropTypes.number,
  url: PropTypes.array,
};
