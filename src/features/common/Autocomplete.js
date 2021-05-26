import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from "@material-ui/icons";
import { Checkbox, TextField, Typography } from "@material-ui/core";

import Chip from "./Chip.js";
import { Autocomplete as MuiAutocomplete } from "@material-ui/lab";
import PropTypes from "prop-types";
import React from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Autocomplete(props) {
  return (
    <div>
      <div>
        <Typography variant="h2" gutterBottom>
          {props.title}
        </Typography>
        <MuiAutocomplete
          multiple
          clearOnBlur={true}
          id={props.title}
          options={props.options}
          disableCloseOnSelect
          getOptionLabel={props.getOptionLabel}
          onChange={props.onChange}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
              />
              {props.getOptionLabel(option)}
            </React.Fragment>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={index}
                {...getTagProps({ index })}
                {...props.getChipProps(option)}
                variant="outlined"
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label={props.label} />
          )}
        />
      </div>
      {props.children}
    </div>
  );
}

Autocomplete.propTypes = {
  children: PropTypes.element,
  getOptionLabel: PropTypes.func.isRequired,
  getChipProps: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  title: PropTypes.string,
  label: PropTypes.string,
};
