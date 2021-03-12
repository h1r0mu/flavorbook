import React from "react";

import { Autocomplete as MuiAutocomplete } from "@material-ui/lab";
import { Checkbox, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from "@material-ui/icons";

import Chip from "../Chip.js";
import Typography from "./Typography.js";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
  },
}));

export default function Autocomplete(props) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
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
                {...getTagProps({ index })}
                {...props.getChipProps(option)}
                variant="outlined"
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label={props.title} />
          )}
        />
      </div>
      <div>{props.children}</div>
    </div>
  );
}
