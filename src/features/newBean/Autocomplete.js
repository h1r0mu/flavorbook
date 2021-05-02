import { Autocomplete as MuiAutocomplete } from "@material-ui/lab";
import PropTypes from "prop-types";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { descriptorUpdate } from "./beanSlice.js";
import { useDispatch } from "react-redux";

export default function Autocomplete({ name, label, options }) {
  const dispatch = useDispatch();
  label = label ? label !== null : name;

  const handleChange = (event, value) => {
    dispatch(descriptorUpdate(name, value));
  };

  return (
    <MuiAutocomplete
      id={label}
      options={options}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      onChange={handleChange}
    />
  );
}

Autocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
};
