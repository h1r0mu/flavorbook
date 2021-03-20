import React from "react";
import renderer from "react-test-renderer";

import Card from "../Card.js";

it("renders correctly", () => {
  const card = renderer
    .create(
      <Card
        picName="sample.png"
        storeName="はぜや珈琲"
        coffeeName="エチオピア　ハロディ　ナチュラル"
        subtitle="City Roast"
        flavors={["dummy", "dummy"]}
      />
    )
    .toJSON();
  expect(card).toMatchSnapshot();
});
