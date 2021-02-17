import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, BrowserRouter, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from "@material-ui/styles";
import AppBar from "./AppBar.js";
import Stepper from "./Stepper.js";
import Button from "./Button.js";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Home from "./Home.js";
import ForgetPassword from "./ForgetPassword.js";
import Result from "./Result.js";
import Wheel from "./Wheel.js";
import { flavorData } from "../data/flavors";
import { GlobalStyles } from "../GlobalStyles";

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
    h1: {
      marginTop: 40,
      marginLeft: 40,
      fontSize: 35,
    },
    h2: {
      marginTop: 20,
      fontSize: 50,
    },
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
        <BrowserRouter>
          <GlobalStyles />
          <div>
            <AppBar />
            <Typography variant="h1" gutterBottom>
              {finish
                ? "あなたの感じた香り一覧"
                : "感じない香りを選択してください"}
            </Typography>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/sign-up">
              <Signup />
            </Route>
            <Route path="/forget-passsword">
              <ForgetPassword />
            </Route>
            <Route path="/selection">
              <Wheel
                tiles={tiles.filter(isVisible)}
                level={level}
                onClick={handleClick}
              />
            </Route>
            <Route path="/result">
              <Result tiles={tiles.filter(isSelected)} />
            </Route>
            <Stepper level={level}>
              <div>
                {level > 0 && !finish && (
                  <Button onClick={handlePrev} text={"戻る"} />
                )}
                {level < 2 && !finish && (
                  <Button onClick={handleNext} text={"次へ"} />
                )}
                {level == 2 && !finish && (
                  <Link to="/result">
                    <Button onClick={handleFinish} text={"結果を見る"} />
                  </Link>
                )}
                {level == 2 && finish && (
                  <Link to="/selection">
                    <Button onClick={handleBack} text={"選択に戻る"} />
                  </Link>
                )}
              </div>
            </Stepper>
          </div>
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
