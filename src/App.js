import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppBar from "./features/header/Header.js";
import AuthFireRoute from "./features/common/AuthFireRoute.js";
import { AuthProvider } from "./contexts/AuthContext";
import Expert from "./features/newBean/Expert.js";
import ForgetPassword from "./features/forgetPassword/ForgetPassword.js";
import { GlobalStyles } from "./GlobalStyles";
import Home from "./features/home/Home.js";
import Login from "./features/login/Login";
import Member from "./features/user/Member.js";
import { Page as MyBeans } from "./features/myBeans/Page.js";
import PropTypes from "prop-types";
import React from "react";
import Signup from "./features/signup/Signup.js";
import { ThemeProvider } from "@material-ui/styles";
import UpdateProfile from "./features/user/UpdateProfile.js";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
  palette: {
    primary: {
      main: "#795548",
    },
    secondary: {
      main: "#f44336",
    },
    background: {
      paper: "#ffe4c4",
      default: "#ffe4c4",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <GlobalStyles />
          <AuthProvider>
            <div>
              <AppBar />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/sign-up">
                  <Signup />
                </Route>
                <Route path="/forget">
                  <ForgetPassword />
                </Route>
                <Route path="/member-test">
                  <MyBeans />
                </Route>
                <Route path="/selection">
                  <Expert />
                </Route>
                <AuthFireRoute path="/member" component={Member} />
                <AuthFireRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />
              </Switch>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

App.propTypes = {
  flavorNames: PropTypes.array,
};
