import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

StoreInfo.propTypes = {
  handleChange: PropTypes.func,
  storeInfo: PropTypes.object,
  readOnly: PropTypes.bool,
};

const createMenuItem = (value, label) => ({ value, label });

const processes = [
  ["WASHED", "WASHED"],
  ["NATURAL", "NATURAL"],
  ["HONEY/PULPED NATURAL", "HONEY/PULPED NATURAL"],
].map((attr) => createMenuItem(...attr));

export default function StoreInfo(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="store"
        name="store"
        label="店の名前"
        value={props.storeInfo.store}
        onChange={props.handleChange}
        InputProps={{
          readOnly: props.readOnly,
        }}
        InputLabelProps={{
          shrink: props.readOnly || props.storeInfo.store,
        }}
      />
      <TextField
        id="country"
        name="country"
        label="産地 (国名)"
        value={props.storeInfo.country}
        onChange={props.handleChange}
        InputProps={{
          readOnly: props.readOnly,
        }}
        InputLabelProps={{
          shrink: props.readOnly || props.storeInfo.country,
        }}
      />
      <TextField
        id="region"
        name="region"
        label="産地 (地域)"
        value={props.storeInfo.region}
        onChange={props.handleChange}
        InputProps={{
          readOnly: props.readOnly,
        }}
        InputLabelProps={{
          shrink: props.readOnly || props.storeInfo.region,
        }}
      />
      <TextField
        id="farm"
        name="farm"
        label="産地 (農園)"
        value={props.storeInfo.farm}
        onChange={props.handleChange}
        InputProps={{
          readOnly: props.readOnly,
        }}
        InputLabelProps={{
          shrink: props.readOnly || props.storeInfo.farm,
        }}
      />
      <TextField
        id="process"
        name="process"
        select
        label="精製方法"
        value={props.storeInfo.process}
        onChange={props.handleChange}
        InputProps={{
          readOnly: props.readOnly,
        }}
        InputLabelProps={{
          shrink: props.readOnly || props.storeInfo.process,
        }}
      >
        <MenuItem value={null}>
          <em>わからない</em>
        </MenuItem>
        {processes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="grind"
        name="grind"
        label="豆の状態"
        value={props.storeInfo.grind}
        onChange={props.handleChange}
        readonly={true}
        InputProps={{
          readOnly: props.readOnly,
        }}
        InputLabelProps={{
          shrink: props.readOnly || props.storeInfo.grind,
        }}
      />
      <TextField
        id="brewing"
        name="brewing"
        label="抽出の方法"
        value={props.storeInfo.brewing}
        onChange={props.handleChange}
        InputProps={{
          readOnly: props.readOnly,
        }}
        InputLabelProps={{
          shrink: props.readOnly || props.storeInfo.brewing,
        }}
      />
      <TextField
        id="purchase-date"
        name="days"
        label="購入した日"
        value={props.storeInfo.days}
        onChange={props.handleChange}
        InputProps={{
          readOnly: props.readOnly,
        }}
        InputLabelProps={{
          shrink: props.readOnly || props.storeInfo.days,
        }}
      />
    </form>
  );
}
