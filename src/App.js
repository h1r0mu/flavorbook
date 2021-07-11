import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppBar from "./features/header/Header.js";
import AuthFireRoute from "./features/common/AuthFireRoute.js";
import { AuthProvider } from "./contexts/AuthContext";
import Selection from "./features/newBean/Selection.js";
import ForgetPassword from "./features/forgetPassword/ForgetPassword.js";
import Home from "./features/home/Home.js";
import Login from "./features/login/Login";
import Signup from "./features/signup/Signup";
import Member from "./features/user/Member.js";
import { Page as MyBeans } from "./features/myBeans/Page.js";
import PropTypes from "prop-types";
import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import UpdateProfile from "./features/user/UpdateProfile.js";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  spacing: [0, 4, 8, 16, 32, 64],
  typography: {
    fontFamily: ["GraphikWeb", "Verdana", "sans-serif", "Helvetica Neue"].join(
      ","
    ),
  },
  palette: {
    primary: {
      main: "#795548",
    },
    secondary: {
      main: "#f44336",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
          margin: "0px",
          backgroundColor: "#f7f3f0",
        },
        body: {
          backgroundColor: "#f7f3f0",
        },
      },
    },
    input: {
      margin: "0px",
    },
    MuiTypography: {
      h2: {
        fontSize: "20px",
        lineHeight: "normal",
        fontWeight: "600",
        margin: "0 0 8px",
      },
    },
    MuiFormControl: {
      root: {
        margin: "10px",
      },
    },
    MuiAutocomplete: {
      option: {
        backgroundColor: "#f7f3f0",
      },
    },
  },
});
theme.spacing(2);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
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
                <Route path="/forget">
                  <ForgetPassword />
                </Route>
                <Route path="/sign-up">
                  <Signup />
                </Route>
                <Route path="/mybeans">
                  <MyBeans />
                </Route>
                <Route path="/selection">
                  <Selection />
                </Route>
                <AuthFireRoute path="/member" component={Member} />
                <AuthFireRoute
                  path="/updateProfile"
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
