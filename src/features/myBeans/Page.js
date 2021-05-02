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
            <BeanList />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
