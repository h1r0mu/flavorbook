import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createMuiTheme } from "@material-ui/core/styles";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import ShareIcon from "@material-ui/icons/Share";
import ChatIcon from "@material-ui/icons/Chat";
import StoreIcon from "@material-ui/icons/Store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "transparent",
    },
    menuButton: {
      marginRight: 20,
      marginLeft: -12,
    },
    title: {
      flexGrow: 1,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
    },
    drawerInner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
    },
    coffee: {
      marginTop: 0,
      marginLeft: 20,
      fontSize: 20,
    },
  })
);

export default function ButtonAppBar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Coffee Flavors
            <EmojiFoodBeverageIcon className={classes.coffee} />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        classes={{
          paper: classes.drawerPaper,
        }}
        onEscapeKeyDown={() => setOpen(false)}
        onBackdropClick={() => setOpen(false)}
        open={open}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpen(false)}>
            <MenuIcon />
          </IconButton>
        </div>
        <div className={classes.drawerInner}>
          <List>
            {[
              "豆の香りを調べる",
              "メンバーの香りをみてみる(近日公開)",
              "メンバー同士で話しあう(近日公開)",
              "豆のお店を探す(近日公開)",
            ].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 4 === 0 ? (
                    <LaptopMacIcon />
                  ) : index % 4 === 1 ? (
                    <ShareIcon />
                  ) : index % 4 === 2 ? (
                    <ChatIcon />
                  ) : (
                    <StoreIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}
