import React from "react";
import Wheel from "../Wheel.js";
import { flavorData } from "../../data/flavors";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tiles = createTiles(flavorData);

  const wheel = renderer
    .create(
      <Wheel tiles={tiles} label="dummy" imagePath="./dummy">
        <div>dummy</div>
      </Wheel>
    )
    .toJSON();
  expect(wheel).toMatchSnapshot();
});

function createTiles(flavorData) {
  const tiles = [];
  flavorData.forEach(([name, level, parentName, imageUrl]) => {
    tiles.push({
      flavor: {
        name: name,
        level: level,
        key: `${name}${level}`,
        imageUrl: imageUrl,
      },
      parent: tiles.find(
        (tile) =>
          tile.flavor.name === parentName && tile.flavor.level === level - 1
      ),
      selected: true,
      visible: level == 0 ? true : false,
    });
  });
  return tiles;
}
