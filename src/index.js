import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import Selector from "./selector.js";
import Result from "./result.js";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route
            path="/"
            exact
            render={() => <Selector page={0} next="/page2" />}
          />
          <Route
            path="/page2"
            render={() => <Selector page={1} next="/page3" prev="/" />}
          />
          <Route
            path="/page3"
            render={() => <Selector page={2} next="/page4" prev="/page2" />}
          />
          <Route
            path="/page4"
            render={() => <Result page={3} next="/" prev="/page3" />}
          />
        </div>
      </BrowserRouter>
    </div>
  );
};

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
