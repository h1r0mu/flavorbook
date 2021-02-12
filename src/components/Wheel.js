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
          <GridListTile key={tile.flavor.name} cols="1">
            <Tile
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
