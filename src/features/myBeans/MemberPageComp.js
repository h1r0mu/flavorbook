import React from "react";
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
import Chip from "./Chips";
import PropTypes from "prop-types";

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

function Highlights() {
  return (
    <Autocomplete
      id="highlights-demo"
      style={{ maxWidth: 300 }}
      options={top100Films}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          margin="normal"
        />
      )}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.title, inputValue);
        const parts = parse(option.title, matches);

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
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
];

export default function MemberPageComp(props) {
  const classes = useStyles();
  function setSearch(setSearch) {
    if (setSearch) {
      return <Highlights className={classes.highlight} />;
    }
  }
  function setIcon(name) {
    switch (name) {
      case "Flavor Type":
        return <LocalCafeIcon className={classes.icon} />;
      case "Country":
        return <PublicIcon className={classes.icon} />;
      case "Shop":
        return <StoreIcon className={classes.icon} />;
      case "Roast":
        return <SportsRugbyIcon className={classes.icon} />;
      default:
        return <p>Iconはないです</p>;
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <Typography variant="h2">
          {props.name}
          {setIcon(props.name)}
        </Typography>
        {setSearch(props.setSearch)}
      </div>
      <div className={classes.chips}>
        <Chip name="Berry" />
        <Chip name="Strawberry" />
      </div>
    </div>
  );
}

MemberPageComp.propTypes = {
  name: PropTypes.string,
  setSearch: PropTypes.bool,
};