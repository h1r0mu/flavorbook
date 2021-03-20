import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "./Card";
import Typography from "@material-ui/core/Typography";
import Chip from "./Chip";
import MemberPageComp from "./MemberPageComp";

const useStyles = makeStyles((theme) => ({
  root: {},
  cards: {},
  chipButton: {
    display: "flex",
    marginLeft: 1000,
  },
}));

export default function Member() {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const _users = [];

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
          <div className={classes.chipButton}>
            <Chip name="CREATE" pattern="Create" color="primary" />
            <Chip name="EDIT" pattern="Edit" color="secondry" />
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
            <Card
              picName="sample.png"
              storeName="はぜや珈琲"
              coffeeName="エチオピア　ハロディ　ナチュラル"
              subtitle="City Roast"
              flavors={flavors}
            />
            <Card
              picName="sample1.png"
              storeName="はぜや珈琲"
              coffeeName="エチオピア　ハロディ　ナチュラル"
              subtitle="City Roast"
              flavors={flavors}
            />
            <Card
              picName="sample2.png"
              storeName="はぜや珈琲"
              coffeeName="エチオピア　ハロディ　ナチュラル"
              subtitle="City Roast"
              flavors={flavors}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
