import "typeface-roboto";

import React, { useState } from "react";

import Button from "./Button.js";
import History from "./History.js";
import PropTypes from "prop-types";
import SaveIcon from "@material-ui/icons/Save";
import StoreInfo from "./Form.js";
import Typography from "@material-ui/core/Typography";
import Wheel from "./Wheel.js";
import { useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    flexGrow: 1,
    h1: {
      marginTop: 40,
      fontSize: 50,
    },
  },
  storeButton: {
    marginBottom: 30,
  },
  history: {
    marginTop: 30,
  },
};

function Result(props) {
  const dispatch = useDispatch();
  const [storeInfo, setStoreInfo] = useState({
    date: null,
    store: null,
    country: null,
    farm: null,
    region: null,
    process: null,
    grind: null,
    brewing: null,
    days: null,
  });
  const [saved, setSaved] = useState(false);
  const [tiles, setTiles] = useState(props.tiles.slice());
  const delimiter = ["などの複雑なフレーバー，", "の強い香りと"][
    Math.floor(Math.random() * 2)
  ];

  const save = () => {
    dispatch({
      type: "histories/historyAdded",
      payload: {
        key: new Date(Date.now()).toISOString(),
        state: {
          storeInfo: storeInfo,
          tiles: tiles,
        },
      },
    });
    setSaved(true);
  };

  const remove = (target) => {
    dispatch({
      type: "histories/historyDeleted",
      payload: {
        key: target.storeInfo.date,
      },
    });
  };
  const handleChange = (event) => {
    setStoreInfo({
      ...storeInfo,
      [event.target.name]: event.target.value,
    });
  };
  const restore = (history) => {
    if (saved === false) {
      return;
    }
    setStoreInfo(history.storeInfo);
    setTiles(history.tiles);
  };
  const convert = () => {
    const top = tiles
      .filter((tile) => tile.flavor.level == 0)
      .map((tile) => tile.flavor.name)
      .join("や");
    const middle = tiles
      .filter((tile) => tile.flavor.level == 1)
      .map((tile) => tile.flavor.name)
      .join("，");
    const bottom = tiles
      .filter((tile) => tile.flavor.level == 2)
      .map((tile) => tile.flavor.name)
      .join("，");
    let notes = top;
    notes += middle ? delimiter + middle : "";
    notes += bottom ? `，微かに${bottom}` : "";
    notes += "の香りを感じます．";
    return notes;
  };

  return (
    <div className="app">
      <div className="app-board">
        <Wheel tiles={tiles} level={props.level} />
      </div>
      <Typography variant="h2" gutterBottom>
        あなたの感じた香りを人に伝えるなら
      </Typography>
      <div>
        <p>{convert()}</p>
      </div>
      <div className={props.classes.storeButton}>
        <StoreInfo
          storeInfo={storeInfo}
          handleChange={handleChange}
          readOnly={saved}
        />
      </div>
      <Button icon={<SaveIcon />} onClick={save} text={"保存する"} />
      <div className={props.classes.history}>
        <History
          headers={Object.keys(storeInfo)}
          onClick={(history) => restore(history)}
          onClickDelete={(history) => remove(history)}
        />
      </div>
      {props.children}
    </div>
  );
}

Result.propTypes = {
  tiles: PropTypes.array,
  level: PropTypes.number,
  prev: PropTypes.string,
  next: PropTypes.string,
  onClickPrev: PropTypes.func,
  onClickNext: PropTypes.func,
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export default withStyles(styles)(Result);
