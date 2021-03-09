import React from "react";
import renderer from "react-test-renderer";
import AppBar from "../AppBar.js";

it("renders correctly", () => {
  const appBar = renderer.create(<AppBar />).toJSON();
  expect(AppBar).toMatchSnapshot();
});
