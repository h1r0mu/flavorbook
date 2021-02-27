import React from "react";
import renderer from "react-test-renderer";

import Button from "../Button.js";

it("renders correctly", () => {
  const button = renderer
    .create(<Button onClick={() => null} text="dummy" />)
    .toJSON();
  expect(button).toMatchSnapshot();
});
