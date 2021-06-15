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
    flexWrap: "wrap",
  },
  chipButton: {
    display: "flex",
    marginLeft: "auto",
    flexWrap: "wrap",
  },
}));

export const Page = () => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [key] = useState([""]);

  const onColorChange = (color) => {
    return dispatch(beanIdFilterChanged(color, "added"));
  };

  const setCards = (key) => {
    return <Cards val={key} />;
  };

  const setChips = (key) => {
    const chipItems = key.map((word) => {
      return word != " " ? (
        <Chips
          name={word}
          pattern="Close"
          color="secondry"
          key={word}
          onClick={() => removeChips(key, word)}
        />
      ) : (
        <> </>
      );
    });
    return <div className={classes.chips}>{chipItems}</div>;
  };

  const removeChips = (list, remove_word) => {
    console.log(list, remove_word)
    // setKey(list.filter((word) => word !== remove_word));
  };

  useEffect(() => {
    setCards(key);
    setChips(key);
  }, [key]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          <SearchForm name="Flavor" addKey={onColorChange} />
          <SearchForm name="Country" addKey={onColorChange} />
          <SearchForm name="Shop" addKey={onColorChange} />
          <SearchForm name="Roast" addKey={onColorChange} />
        </Grid>
        <Grid item xs={7}>
          <div className={classes.chips}>
          </div>
          <div className={classes.chips}>
            <BeanList />
          </div>
        </Grid>
      </Grid>
      <Grid item xs={1}></Grid>
    </div>
  );
};
