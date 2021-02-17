import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GridListTile } from "@material-ui/core";
import { GridList } from "@material-ui/core";

import Tile from "./Tile.js";

const useStyles = makeStyles(() => ({
  list: {
    display: "flex",
    flexWrap: "wrap",
  },
  flavors: {},
}));

export default function Wheel(props) {
  const selectedFlavorNames = props.tiles
    .filter((tile) => tile.selected)
    .map((tile) => tile.name);

  const classes = useStyles();

  return (
    <div className={classes.flavors}>
      <GridList cellHeight="auto" cols="auto">
        {props.tiles.map((tile) => (
          <GridListTile key={tile.flavor.key} cols="1">
            <Tile
              className={classes.list}
              key={tile.flavor.key}
              value={tile.flavor.name}
              selected={tile.flavor.selected}
              imageUrl={tile.flavor.imageUrl}
              onClick={props.onClick ? () => props.onClick(tile) : null}
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
  imageUrl: PropTypes.string,
};
