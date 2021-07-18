import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from "@material-ui/icons";
import { Checkbox, TextField } from "@material-ui/core";

import Chip from "./Chip.js";
import { Autocomplete as MuiAutocomplete } from "@material-ui/lab";
import PropTypes from "prop-types";
import React from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Autocomplete = ({
  title,
  options,
  label,
  getChipProps,
  onChange,
  children,
  value,
}) => {
  return (
    <div>
      <div>
        <MuiAutocomplete
          multiple
          clearOnBlur={true}
          id={title}
          options={options}
          disableCloseOnSelect
          value={value}
          onChange={onChange}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
              />
              {option}
            </React.Fragment>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={index}
                {...getTagProps({ index })}
                {...getChipProps(option)}
                variant="outlined"
              />
            ))
          }
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      </div>
      {children}
    </div>
  );
};

Autocomplete.propTypes = {
  children: PropTypes.element,
  getChipProps: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  title: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.array,
};

export default Autocomplete;
