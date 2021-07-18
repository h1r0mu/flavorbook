import { Autocomplete as MuiAutocomplete } from "@material-ui/lab";
import PropTypes from "prop-types";
import React from "react";
import TextField from "@material-ui/core/TextField";

export default function Autocomplete({ name, label, options, handleChange }) {
  label = label ? label !== null : name;

  return (
    <MuiAutocomplete
      id={label}
      options={options}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={handleChange}
    />
  );
}

Autocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  handleChange: PropTypes.func,
};
