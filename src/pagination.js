import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Link } from "react-router-dom";

const MainPage = (props) => {
  return (
    <div className="Page{props.num}">
      <h1>coffee{props.num}</h1>
      <NextButton page={props.next} />
    </div>
  );
};
MainPage.propTypes = {
  num: PropTypes.number,
  next: PropTypes.string,
};
const OtherPage = (props) => {
  return (
    <div className="Page{props.num}">
      <h1>coffee{props.num}</h1>
      <BeforeButton page={props.before} />
      <NextButton page={props.next} />
    </div>
  );
};
OtherPage.propTypes = {
  num: PropTypes.number,
  before: PropTypes.string,
  next: PropTypes.string,
};
const BeforeButton = (props) => {
  return (
    <Link to={props.page}>
      <button>{"Before"}</button>
    </Link>
  );
};
BeforeButton.propTypes = {
  page: PropTypes.string,
};
const NextButton = (props) => {
  return (
    <Link to={props.page}>
      <button>{"Next"}</button>
    </Link>
  );
};
NextButton.propTypes = {
  page: PropTypes.string,
};

const Pagination = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route
            path="/"
            exact
            render={() => <MainPage num={1} next="/page2" />}
          />
          <Route
            path="/page2"
            render={() => <OtherPage num={2} next="/page3" before="/" />}
          />
          <Route
            path="/page3"
            render={() => <OtherPage num={3} next="/page4" before="/page2" />}
          />
          <Route
            path="/page4"
            render={() => <OtherPage num={4} next="/" before="/page3" />}
          />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Pagination;
