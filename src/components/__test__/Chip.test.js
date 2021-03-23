import Chip from "../Chip.js";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const chip = renderer
    .create(<Chip label="dummy" imagePath="./dummy" />)
    .toJSON();
  expect(chip).toMatchSnapshot();
});
