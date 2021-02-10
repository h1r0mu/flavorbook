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
};

const createMenuItem = (value, label) => ({ value, label });

const processes = [
  ["WASHED", "WASHED"],
  ["NATURAL", "NATURAL"],
  ["HONEY/PULPED NATURAL", "HONEY/PULPED NATURAL"],
].map((attr) => createMenuItem(...attr));

const countries = [
  ["エチオピア", "エチオピア"],
  ["ケニア", "ケニア"],
  ["ブルンジ", "ブルンジ"],
  ["ルワンダ", "ルワンダ"],
  ["イエメン", "イエメン"],
  ["インドネシア", "インドネシア"],
  ["インド", "インド"],
  ["東ティモール", "東ティモール"],
  ["ハワイ(アメリカ)", "ハワイ(アメリカ)"],
  ["メキシコ", "メキシコ"],
  ["グアテマラ", "グアテマラ"],
  ["コスタリカ", "コスタリカ"],
  ["パナマ", "パナマ"],
  ["ジャマイカ", "ジャマイカ"],
  ["エルサルバドル", "エルサルバドル"],
  ["キューバ", "キューバ"],
  ["ドミニカ", "ドミニカ"],
  ["コロンビア", "コロンビア"],
  ["タンザニア", "タンザニア"],
  ["ホンジュラス", "ホンジュラス"],
  ["エルサルバドル", "エルサルバドル"],
  ["ブラジル", "ブラジル"],
  ["ペルー", "ペルー"],
].map((attr) => createMenuItem(...attr));

export default function StoreInfo(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="store"
        name="store"
        label="店の名前"
        onChange={props.handleChange}
      />
      <TextField
        select
        id="country"
        name="country"
        label="産地 (国名)"
        onChange={props.handleChange}
      >
        <MenuItem value={null}>
          <em>なし</em>
        </MenuItem>
        {countries.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="region"
        name="region"
        label="産地 (地域)"
        onChange={props.handleChange}
      />
      <TextField
        id="farm"
        name="farm"
        label="産地 (農園)"
        onChange={props.handleChange}
      />
      <TextField
        id="process"
        name="process"
        select
        label="精製方法"
        value={props.storeInfo.process ? props.storeInfo.process : ""}
        onChange={props.handleChange}
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
      <TextField id="grind" label="豆の状態" onChange={props.handleChange} />
      <TextField
        id="brewing"
        name="brewing"
        label="抽出の方法"
        onChange={props.handleChange}
      />
      <TextField
        id="purchase-date"
        name="days"
        label="購入した日"
        onChange={props.handleChange}
      />
    </form>
  );
}
