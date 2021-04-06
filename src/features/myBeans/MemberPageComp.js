import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "./Chips";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import PropTypes from "prop-types";
import PublicIcon from "@material-ui/icons/Public";
import React from "react";
import SportsRugbyIcon from "@material-ui/icons/SportsRugby";
import StoreIcon from "@material-ui/icons/Store";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 40,
  },
  wrap: {
    marginLeft: 30,
  },
  chips: {
    marginTop: 20,
  },
  icon: {
    fontSize: 50,
    marginLeft: 30,
  },
}));

function Highlights() {
  return (
    <Autocomplete
      id="highlights-demo"
      style={{ maxWidth: 300 }}
      options={[]}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          margin="normal"
        />
      )}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.title, inputValue);
        const parts = parse(option.title, matches);

        return (
          <div>
            {parts.map((part, index) => (
              <span
                key={index}
                style={{ fontWeight: part.highlight ? 700 : 400 }}
              >
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
    />
  );
}

export default function MemberPageComp(props) {
  const classes = useStyles();
  function setSearch(setSearch) {
    if (setSearch) {
      return <Highlights className={classes.highlight} />;
    }
  }
  function setIcon(name) {
    switch (name) {
      case "Flavor Type":
        return <LocalCafeIcon className={classes.icon} />;
      case "Country":
        return <PublicIcon className={classes.icon} />;
      case "Shop":
        return <StoreIcon className={classes.icon} />;
      case "Roast":
        return <SportsRugbyIcon className={classes.icon} />;
      default:
        return <p>Iconはないです</p>;
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <Typography variant="h2">
          {props.name}
          {setIcon(props.name)}
        </Typography>
        {setSearch(props.setSearch)}
      </div>
      <div className={classes.chips}>
        <Chip name="Berry" />
        <Chip name="Strawberry" />
      </div>
    </div>
  );
}

MemberPageComp.propTypes = {
  name: PropTypes.string,
  setSearch: PropTypes.bool,
};
