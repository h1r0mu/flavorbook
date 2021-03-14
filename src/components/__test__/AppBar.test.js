import AppBar from "../AppBar.js";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const appBar = renderer.create(<AppBar />).toJSON();
  expect(appBar).toMatchSnapshot();
});
