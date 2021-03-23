import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "./Card";
import Chip from "./Chips";
import MemberPageComp from "./MemberPageComp";
import Cards from "./Cards";

const useStyles = makeStyles((theme) => ({
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
  const history = useHistory();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  async function handleSendEmailVerification() {
    setError("");
    try {
      await sendEmailVerification();
      setError("メールをおくりました。メール有効化をお願いします");
    } catch (e) {
      console.log(e);
      setError("有効化メールの送信に失敗しました。");
    }
  }
  const flavors = ["fruity", "floral"];

  return (
    <div className={classes.root}>
      <div>{error && <div style={{ color: "red" }}>{error}</div>}</div>
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
