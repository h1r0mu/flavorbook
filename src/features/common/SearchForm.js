import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PublicIcon from "@material-ui/icons/Public";
import StoreIcon from "@material-ui/icons/Store";
import SportsRugbyIcon from "@material-ui/icons/SportsRugby";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import PropTypes from "prop-types";
import { db } from "../../firebase.js";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 40,
  },
  wrap: {
    marginLeft: 30,
  },
  chips: {
    marginTop: 20,
  },
  icon: {
    fontSize: 50,
    marginLeft: 30,
  },
}));

function Highlights(props) {
  return (
    <>
      <Autocomplete
        id="highlights-demo"
        style={{ maxWidth: 300 }}
        options={props.list}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            variant="outlined"
            margin="normal"
          />
        )}
        onInputChange={(event, newInputValue) => {
          props.addKey(newInputValue);
        }}
        renderOption={(option, { inputValue }) => {
          const matches = match(option, inputValue);
          const parts = parse(option, matches);

          return (
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          );
        }}
      />
    </>
  );
}

export default function SearchForm(props) {
  const [cards, setCards] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const fetchData = async () => {
      const ref = db.collection("beans");
      const snapShot = await ref.get();
      const _cards = snapShot.docs.map((doc) => {
        const item = doc.data();
        return item;
      });
      setCards(_cards);
    };
    fetchData();
  }, []);

  let resultList = [];

  cards.map((card) => {
    switch (props.name) {
      case "Flavor":
        card.flavorLevel1Descriptors.map((flavor) => {
          resultList.push(flavor);
        });
        break;
      case "Country":
        resultList.push(card.country);
        break;
      case "Shop":
        resultList.push(card.store);
        break;
      case "Process":
        resultList.push(card.process);
        break;
      default:
        console.log("Bugs are discovered.");
        break;
    }

    let set = new Set(resultList);
    resultList = Array.from(set);
  });

  function setSearch() {
    return (
      <Highlights
        className={classes.highlight}
        list={resultList}
        addKey={props.addKey}
      />
    );
  }

  function setIcon(name) {
    switch (name) {
      case "Flavor":
        return <LocalCafeIcon className={classes.icon} />;
      case "Country":
        return <PublicIcon className={classes.icon} />;
      case "Shop":
        return <StoreIcon className={classes.icon} />;
      case "Process":
        return <SportsRugbyIcon className={classes.icon} />;
      default:
        return <></>;
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <Typography variant="h2">
          {props.name}
          {setIcon(props.name)}
        </Typography>
        {setSearch()}
      </div>
    </div>
  );
}

SearchForm.propTypes = {
  name: PropTypes.string,
  addKey: PropTypes.function,
};

Highlights.propTypes = {
  list: PropTypes.array,
  addKey: PropTypes.function,
};
