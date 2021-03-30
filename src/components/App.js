import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";

import AppBar from "./AppBar.js";
import AuthFireRoute from "./AuthFireRoute.js";
import { AuthProvider } from "./contexts/AuthContext.js";
import Expert from "./Register/Expert.js";
import ForgetPassword from "./ForgetPassword.js";
import { GlobalStyles } from "../GlobalStyles";
import Home from "./Home.js";
import Login from "./Login.js";
import Member from "./Member.js";
import MemberTest from "./MemberTest.js";
import PropTypes from "prop-types";
import Signup from "./Signup.js";
import { ThemeProvider } from "@material-ui/styles";
import UpdateProfile from "./UpdateProfile.js";
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
                  <MemberTest />
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
