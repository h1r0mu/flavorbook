import BeanList from "./BeanList";
import Chips from "./Chips";
import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchForm from "../common/SearchForm";
import Cards from "./Cards";

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
  const classes = useStyles();
  const [key, setKey] = useState([" "]);

  const addKey = (str) => {
    return setKey(Array.from(new Set([...key, str])));
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
    setKey(list.filter((word) => word !== remove_word));
  };

  useEffect(() => {
    setKey(key);
    setCards(key);
    setChips(key);
  }, [key]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={1}>
								</Grid>
        <Grid item xs={3}>
          <SearchForm name="Flavor" addKey={addKey} />
          <SearchForm name="Country" addKey={addKey} />
          <SearchForm name="Shop" addKey={addKey} />
          <SearchForm name="Process" addKey={addKey} />
        </Grid>
        <Grid item xs={7}>
          <div>{setChips(key)}</div>
          <div className={classes.chips}>
            <BeanList keyWords={key} />
          </div>
        </Grid>
      </Grid>
						<Grid item xs={1}>
						</Grid>
    </div>
  );
};
