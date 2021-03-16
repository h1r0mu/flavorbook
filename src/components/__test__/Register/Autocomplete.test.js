import Autocomplete from "../../Register/Autocomplete.js";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const snapshot = renderer
    .create(
      <Autocomplete
        title="title"
        onChange={() => null}
        options={["paper", "flannel", "metal"]}
        getChipProps={() => ({ label: "label", imagePath: "imagePath" })}
        getOptionLabel={() => "label"}
      >
        <div>We are Children!</div>
      </Autocomplete>
    )
    .toJSON();
  expect(snapshot).toMatchSnapshot();
});

it("the children are in the document", () => {
  const children = <div>We are Children!</div>;
  const instance = renderer.create(
    <Autocomplete
      title="title"
      onChange={() => null}
      options={["paper", "flannel", "metal"]}
      getChipProps={() => ({ label: "label", imagePath: "imagePath" })}
      getOptionLabel={() => "label"}
    >
      {children}
    </Autocomplete>
  ).root;

  expect(instance.findByType(Autocomplete).props.children).toEqual(children);
});

it("renders correctly when minimal props are given", () => {
  const snapshot = renderer
    .create(
      <Autocomplete
        title="title"
        options={["paper", "flannel", "metal"]}
        getOptionLabel={() => "label"}
      />
    )
    .toJSON();
  expect(snapshot).toMatchSnapshot();
});
