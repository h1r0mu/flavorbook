import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useAuth } from "./contexts/AuthContext";

export default function AuthFirebaseRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}

AuthFirebaseRoute.propTypes = {
  component: PropTypes.elementType,
};
