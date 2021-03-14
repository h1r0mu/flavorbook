import renderer from "react-test-renderer";
import React from "react";
import AppBar from "../AppBar.js";

it("renders correctly", () => {
  const appBar = renderer.create(<AppBar />).toJSON();
  expect(appBar).toMatchSnapshot();
});
