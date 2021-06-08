import BeanList from "./BeanList";
import Chips from "./Chips";
import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SearchForm from "./SearchForm";
import Cards from "./Cards";
import { beanIdFilterChanged } from "./beansFiltersSlice";

const useStyles = makeStyles(() => ({
  root: {},
  cards: {},
  chips: {
    display: "flex",
    maxWidth: 1000,
  },
  chipButton: {
    display: "flex",
    marginLeft: "auto",
  },
}));

export const Page = () => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [key] = useState([""]);

  const onColorChange = (color) => {
    return dispatch(beanIdFilterChanged(color, "added"));
  };

  // const addKey = (str) => {
  //   return setKey(Array.from(new Set([...key, str])));
  // };

  const setKeyWords = (key) => {
    return <Cards val={key} />;
  };

  useEffect(() => {
    setKeyWords(key);
  }, [key]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={10}>
          <div className={classes.chips}>
            <Chips
              name="CREATE"
              pattern="Create"
              color="primary"
              className={classes.chipButton}
            />
            <Chips
              name="EDIT"
              pattern="Edit"
              color="secondry"
              className={classes.chipButton}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <SearchForm name="Flavor" addKey={onColorChange} />
          <SearchForm name="Country" addKey={onColorChange} />
          <SearchForm name="Shop" addKey={onColorChange} />
          <SearchForm name="Roast" addKey={onColorChange} />
        </Grid>
        <Grid item xs={9}>
          <div className={classes.cards}>
            <p>{key}</p>
            <div>{setKeyWords(key)}</div>
            <BeanList />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
