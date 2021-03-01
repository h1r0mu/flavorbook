import React from "react";
import renderer from "react-test-renderer";

import ComplexButton from "../ComplexButton.js";

it("renders correctly", () => {
  const complexButton = renderer
    .create(<ComplexButton onClick={() => null} url="./dummy" value="dummy" />)
    .toJSON();
  expect(complexButton).toMatchSnapshot();
});
