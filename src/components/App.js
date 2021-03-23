import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import React, { useState } from "react";

import AppBar from "./AppBar.js";
import AuthFireRoute from "./AuthFireRoute.js";
import { AuthProvider } from "./contexts/AuthContext.js";
import Button from "./Button.js";
import Expert from "./Register/Expert.js";
import ForgetPassword from "./ForgetPassword.js";
import { GlobalStyles } from "../GlobalStyles";
import Home from "./Home.js";
import Login from "./Login.js";
import Member from "./Member.js";
import PropTypes from "prop-types";
import Result from "./Result.js";
import Signup from "./Signup.js";
import Stepper from "./Stepper.js";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import UpdateProfile from "./UpdateProfile.js";
import MemberTest from "./MemberTest.js";
import Wheel from "./Wheel.js";
import { createMuiTheme } from "@material-ui/core/styles";
import { flavorData } from "../data/flavors";

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
  const [tiles, setTiles] = useState(createTiles(flavorData));
  const [level, setLevel] = useState(0);
  const [finish, setFinish] = useState(false);

  const handleClick = (tile) => {
    const newTiles = tiles.slice();
    const newTile = newTiles.find((newTile) => isEquivalent(newTile, tile));
    newTile.selected = !newTile.selected;
    setTiles(newTiles);
  };

  const handlePrev = () => {
    const newTiles = tiles.slice();
    const newLevel = level - 1;

    newTiles.filter(isLevel(level)).forEach(setInvisible);
    newTiles
      .filter(isLevel(newLevel))
      .filter((tile) => tile.flavor.level === 0 || tile.parent.selected)
      .forEach(setVisible);
    newTiles
      .filter(isLevel(level))
      .filter((tile) => tile.parent.selected)
      .forEach(setSelected);

    setTiles(newTiles);
    setLevel(newLevel);
  };

  const handleNext = () => {
    const newTiles = tiles.slice();
    const newLevel = level + 1;

    newTiles.filter(isLevel(level)).forEach(setInvisible);
    newTiles
      .filter(isLevel(newLevel))
      .filter((tile) => tile.parent.selected)
      .forEach(setVisible);
    newTiles
      .filter(isLevel(newLevel))
      .filter((tile) => !tile.parent.selected)
      .forEach(setUnselected);

    setTiles(newTiles);
    setLevel(newLevel);
  };

  const handleFinish = () => setFinish(true);
  const handleBack = () => setFinish(false);
  const isEquivalent = (tile1, tile2) => tile1.flavor.key === tile2.flavor.key;
  const isLevel = (level) => (tile) => tile.flavor.level === level;
  const isVisible = (tile) => tile.visible;
  const isSelected = (tile) => tile.selected;
  const setVisible = (tile) => (tile.visible = true);
  const setInvisible = (tile) => (tile.visible = false);
  const setSelected = (tile) => (tile.selected = true);
  const setUnselected = (tile) => (tile.selected = false);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <GlobalStyles />
          <AuthProvider>
            <div>
              <AppBar />
              <Typography variant="h4" gutterBottom>
                {finish
                  ? "あなたの感じた香り一覧"
                  : "明らかに感じないと思う香りを選んでください"}
              </Typography>
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
                <Route path="/expert">
                  <Expert />
                </Route>
                <AuthFireRoute path="/member" component={Member} />
                <AuthFireRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />
                <Route path="/selection">
                  <Wheel
                    tiles={tiles.filter(isVisible)}
                    level={level}
                    onClick={handleClick}
                  >
                    <Stepper level={level}>
                      <div>
                        {level > 0 && (
                          <Button onClick={handlePrev} text={"戻る"} />
                        )}
                        {level !== 2 && (
                          <Button onClick={handleNext} text={"次へ"} />
                        )}
                        {level === 2 && (
                          <Link to="/result">
                            <Button
                              onClick={handleFinish}
                              text={"結果を見る"}
                            />
                          </Link>
                        )}
                      </div>
                    </Stepper>
                  </Wheel>
                </Route>
                <Route path="/result">
                  <Result tiles={tiles.filter(isSelected)}>
                    <Stepper level={level}>
                      <div>
                        <Link to="/selection">
                          <Button onClick={handleBack} text={"選択に戻る"} />
                        </Link>
                      </div>
                    </Stepper>
                  </Result>
                </Route>
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

function createTiles(flavorData) {
  const tiles = [];
  flavorData.forEach(([name, level, parentName, imageUrl]) => {
    tiles.push({
      flavor: {
        name: name,
        level: level,
        key: `${name}${level}`,
        imageUrl: imageUrl,
      },
      parent: tiles.find(
        (tile) =>
          tile.flavor.name === parentName && tile.flavor.level === level - 1
      ),
      selected: true,
      visible: level == 0 ? true : false,
    });
  });
  return tiles;
}
