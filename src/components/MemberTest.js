import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Chips from "./Chips";
import SearchForm from "./SearchForm";
import Cards from "./Cards";

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

export default function Member() {
  const classes = useStyles();
  const [key, setKey] = useState([""]);

  const addKey = (str) => {
    return setKey(Array.from(new Set([...key, str])));
  };

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
          <SearchForm name="Flavor" addKey={addKey} />
          <SearchForm name="Country" addKey={addKey} />
          <SearchForm name="Shop" addKey={addKey} />
          <SearchForm name="Roast" addKey={addKey} />
        </Grid>
        <Grid item xs={9}>
          <div className={classes.cards}>
            <p>{key}</p>
            <div>{setKeyWords(key)}</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
