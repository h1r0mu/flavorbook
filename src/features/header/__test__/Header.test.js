import AppBar from "../Header";
import React from "react";
import renderer from "react-test-renderer";
import {createMemoryHistory} from 'history'
import {BrowserRouter } from "react-router-dom";

//const history = createMemoryHistory();
//history.push("/login")
it("renders correctly", () => {
  const appBar = renderer.create(
				<BrowserRouter>
				 <AppBar />
				</BrowserRouter>
		).toJSON();
  expect(appBar).toMatchSnapshot();
});
