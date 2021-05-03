import BeanList from "./BeanList";
import Chip from "./Chips";
import Grid from "@material-ui/core/Grid";
import MemberPageComp from "./MemberPageComp";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
<<<<<<< HEAD:src/components/MemberTest.js
            <p>{key}</p>
            <div>{setKeyWords(key)}</div>
=======
            <BeanList />
>>>>>>> b13621260eec142b53bd61a975b8ddcffb1209c1:src/features/myBeans/Page.js
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
