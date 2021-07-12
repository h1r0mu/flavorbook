import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

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
  form: {
    maxWidth: 300,
  },
}));

export default function SearchForm({ label, icon, onChange, selector }) {
  const classes = useStyles();
  const options = useSelector(selector);

  const renderOption = (option, { inputValue }) => {
    const matches = match(option, inputValue);
    const parts = parse(option, matches);

    return (
      <div>
        {parts.map((part, index) => (
          <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    );
  };

  const renderInput = (params) => (
    <TextField {...params} label="Search" margin="normal" />
  );

  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <Typography variant="h4">
          {icon}
          {label}
        </Typography>
        <Autocomplete
          multiple
          id="search-form"
          className={classes.form}
          options={options.filter((option) => option !== null)}
          onChange={(event, newInputValue) => {
            onChange(newInputValue);
          }}
          renderInput={renderInput}
          renderOption={renderOption}
        />
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
