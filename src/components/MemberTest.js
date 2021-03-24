import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "./Chips";
import MemberPageComp from "./MemberPageComp";
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

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={10}>
          <div className={classes.chips}>
            <Chip
              name="CREATE"
              pattern="Create"
              color="primary"
              className={classes.chipButton}
            />
            <Chip
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
          <MemberPageComp name="Flavor Type" setSearch={false} />
          <MemberPageComp name="Country" setSearch={true} />
          <MemberPageComp name="Shop" setSearch={true} />
          <MemberPageComp name="Roast" setSearch={true} />
        </Grid>
        <Grid item xs={9}>
          <div className={classes.cards}>
            <Cards />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
