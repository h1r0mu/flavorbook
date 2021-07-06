import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PublicIcon from "@material-ui/icons/Public";
import StoreIcon from "@material-ui/icons/Store";
import SportsRugbyIcon from "@material-ui/icons/SportsRugby";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import PropTypes from "prop-types";
import { db } from "../../firebase.js";
import {useSelector} from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 100,
  },
  wrap: {
    marginLeft: 100,
  },
  chips: {
    marginTop: 20,
  },
  icon: {
    fontSize: 30,
    marginRight: 30,
  },
}));

function Highlights({selector, onChange}) {
  const options = useSelector(selector);

  return (
    <>
      <Autocomplete
        id="highlights-demo"
        style={{ maxWidth: 300 }}
        options={options.filter(option => option !== null)}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} label="Search" margin="normal" />
        )}
        onChange={(event, newInputValue) => {
          onChange(newInputValue);
        }}
        renderOption={(option, { inputValue }) => {
          const matches = match(option, inputValue);
          const parts = parse(option, matches);

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
    </>
  );
}

export default function SearchForm({label, icon, onChange, selector}) {
  const classes = useStyles();

  function setSearch() {
    return (
      <Highlights
        className={classes.highlight}
        onChange={onChange}
        selector={selector}
        list={resultList}
        addKey={props.addKey}
      />
    );
  }

  function setIcon(name) {
    switch (name) {
      case "Flavor":
        return <LocalCafeIcon className={classes.icon} />;
      case "Country":
        return <PublicIcon className={classes.icon} />;
      case "Shop":
        return <StoreIcon className={classes.icon} />;
      case "Process":
        return <SportsRugbyIcon className={classes.icon} />;
      default:
        return <></>;
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <Typography variant="h4">
          {setIcon(props.name)}
          {props.name}
        </Typography>
        {setSearch()}
      </div>
    </div>
  );
}

SearchForm.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.element,
  onChange: PropTypes.function,
  selector: PropTypes.function,
};

Highlights.propTypes = {
  onChange: PropTypes.function,
  selector: PropTypes.function,
};
