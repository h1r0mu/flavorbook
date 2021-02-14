import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/auth-context.js";
import Selector from "./selector.js";
import PropTypes from "prop-types";

export default function AuthFirebaseRoute(props) {
  const { currentUser } = useAuth();

  return (
    <Route
      path={props.path}
      render={(props) => {
        return currentUser ? (
          <Selector
            tiles={props.tiles}
            page={props.page}
            next={props.next}
            prev={props.prev}
            onClickPrev={props.onClickPrev}
            onClickNext={props.onClickNext}
            onClickTile={props.onClickTile}
          />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}
AuthFirebaseRoute.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string,
  tiles: PropTypes.array,
  prev: PropTypes.string,
  next: PropTypes.string,
  page: PropTypes.number,
  onClickTile: PropTypes.func,
  onClickPrev: PropTypes.func,
  onClickNext: PropTypes.func,
};
