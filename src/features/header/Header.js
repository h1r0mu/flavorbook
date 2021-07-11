import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Chat as ChatIcon,
  EmojiFoodBeverage as EmojiFoodBeverageIcon,
  LaptopMac as LaptopMacIcon,
  Menu as MenuIcon,
  Share as ShareIcon,
  Store as StoreIcon,
  AccountCircle as AccountCircle,
} from "@material-ui/icons";
import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() =>
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
    link: {
      color: "#fff",
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
          <Link to="/login" className={classes.link}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Link>
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
