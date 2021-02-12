import PropTypes from "prop-types";
import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import Steppers from "./stepper.js";
import Wheel from "./components/Wheel.js";
import StoreInfo from "./forms.js";
import History from "./components/History.js";
import AppBar from "./appBar.js";
import Button from "./components/Button.js";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#795548",
    },
    secondary: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      marginTop: 40,
      fontSize: 50,
    },
    h2: {
      marginTop: 20,
      fontSize: 50,
    },
  },
});

const styles = {
  root: {
    flexGrow: 1,
  },
  storeButton: {
    marginBottom: 30,
  },
  history: {
    marginTop: 30,
  },
};

class Result extends React.Component {
  constructor(props) {
    const histories = localStorage.getItem("flavorBook")
      ? JSON.parse(localStorage.getItem("flavorBook"))
      : {};
    super(props);
    this.state = {
      storeInfo: {
        date: null,
        store: null,
        country: null,
        farm: null,
        region: null,
        process: null,
        grind: null,
        brewing: null,
        days: null,
      },
      tiles: props.tiles.slice(),
      histories: histories,
      saved: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.restore = this.restore.bind(this);
    this.delimiter = ["などの複雑なフレーバー，", "の強い香りと"][
      Math.floor(Math.random() * 2)
    ];
  }
  save() {
    const key = new Date(Date.now()).toISOString();
    let histories = { ...this.state.histories };
    const state = { ...this.state };
    state.storeInfo.date = key;
    histories = { ...histories, [key]: state };
    this.setState({ histories: histories, saved: true });
    localStorage.setItem("flavorBook", JSON.stringify(histories));
  }
  delete(target) {
    const histories = Object.keys(this.state.histories).reduce(
      (object, key) => {
        history;
        if (key !== target.storeInfo.date) {
          object[key] = this.state.histories[key];
        }
        return object;
      },
      {}
    );
    this.setState({ histories: histories });
  }
  handleChange(event) {
    this.setState({
      storeInfo: {
        ...this.state.storeInfo,
        [event.target.name]: event.target.value,
      },
    });
  }
  restore(history) {
    if (this.state.saved === false) {
      return;
    }
    this.setState({ storeInfo: history.storeInfo, tiles: history.tiles });
  }
  convert() {
    const tiles = this.state.tiles;
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
    notes += middle ? this.delimiter + middle : "";
    notes += bottom ? `，微かに${bottom}` : "";
    notes += "の香りを感じます．";
    return notes;
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="app">
          <div className="tabs">
            <AppBar />
          </div>
          <Typography variant="h1" gutterBottom>
            あなたの感じた香り一覧
          </Typography>
          <div className="app-board">
            <Wheel tiles={this.state.tiles} level={this.props.level} />
          </div>
          <Typography variant="h2" gutterBottom>
            バリスタ語への翻訳結果
          </Typography>
          <div>
            <p>{this.convert()}</p>
          </div>
          <div className={this.props.classes.storeButton}>
            <StoreInfo
              storeInfo={this.state.storeInfo}
              handleChange={this.handleChange}
              readOnly={this.state.saved}
            />
          </div>
          <Button icon={<SaveIcon />} onClick={this.save} text={"保存する"} />
          <div className={this.props.classes.history}>
            <History
              headers={Object.keys(this.state.storeInfo)}
              histories={this.state.histories}
              onClick={(history) => this.restore(history)}
              onClickDelete={(history) => this.delete(history)}
            />
          </div>
          <div className="stepppers">
            <Steppers
              level={this.props.level}
              prev={this.props.prev}
              next={this.props.next}
            />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

Result.propTypes = {
  tiles: PropTypes.array,
  level: PropTypes.number,
  prev: PropTypes.string,
  next: PropTypes.string,
  onClickPrev: PropTypes.func,
  onClickNext: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Result);
