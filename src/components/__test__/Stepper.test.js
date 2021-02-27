import React from "react";
<<<<<<< HEAD
import renderer from "react-test-renderer";

import Stepper from "../Stepper.js";

it('renders correctly', () => {
  const stepper = renderer.create(
    <Stepper level={0}>
    <div>dummy</div>
    </Stepper>
  ).toJSON();
  expect(stepper).toMatchSnapshot();
});
