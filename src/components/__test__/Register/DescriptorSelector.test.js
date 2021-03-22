import * as reactRedux from "react-redux";

import DescriptorSelector from "../../Register/DescriptorSelector.js";
import React from "react";
import renderer from "react-test-renderer";

const mockFlavors = [
  {
    name: "name",
    level: 0,
    key: "key",
    imageUrl: "imageUrl",
    parent: null,
    description: "description",
  },
];

describe("renders correctly", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  test("match a snapshot", () => {
    useSelectorMock.mockReturnValue([]);
    const snapshot = renderer
      .create(<DescriptorSelector title="TITLE" options={mockFlavors} />)
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
