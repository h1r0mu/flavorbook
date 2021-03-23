import React from "react";
import Stepper from "../Stepper.js";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const stepper = renderer
    .create(
      <Stepper level={0}>
        <div>dummy</div>
      </Stepper>
    )
    .toJSON();
  expect(stepper).toMatchSnapshot();
});
