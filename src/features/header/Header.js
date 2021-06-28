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
import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Modal from "react-modal";
import Login from "../login/Login.js";
import Forget from "../forgetPassword/ForgetPassword.js";
import Signup from "../signup/Signup.js";
import PropTypes from "prop-types";

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
    modal: {
      display: "flex",
      flexWrap: "wrap",
      width: 800,
      margin: "auto",
      marginTop: 100,
    },
  })
);

export default function ButtonAppBar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(true);
  const [forgetIsOpen, setForgetIsOpen] = useState(false);
  const [signupIsOpen, setSignupIsOpen] = useState(false);

  useEffect(() => {
    console.log("再びレンダリング");
    console.log(loginIsOpen);
    console.log(forgetIsOpen);
    console.log(signupIsOpen);
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        className={classes.modal}
      >
        <OpenComponent
          loginIsOpen={loginIsOpen}
          forgetIsOpen={forgetIsOpen}
          signupIsOpen={signupIsOpen}
          setLoginIsOpen={() => setLoginIsOpen}
          setSignupIsOpen={() => setSignupIsOpen}
          setForgetIsOpen={() => setForgetIsOpen}
        />
      </Modal>
    );
  }, [loginIsOpen, forgetIsOpen, signupIsOpen]);

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
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={() => setIsOpen(true)}
          >
            <AccountCircle />
          </IconButton>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            className={classes.modal}
          >
            <OpenComponent
              loginIsOpen={loginIsOpen}
              forgetIsOpen={forgetIsOpen}
              signupIsOpen={signupIsOpen}
              setLoginIsOpen={() => setLoginIsOpen}
              setSignupIsOpen={() => setSignupIsOpen}
              setForgetIsOpen={() => setForgetIsOpen}
            />
          </Modal>
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

const OpenComponent = (props) => {
  console.log("OpenComponentの関数内");
  const loginIsOpen = props.loginIsOpen;
  const forgetIsOpen = props.forgetIsOpen;
  const signupIsOpen = props.signupIsOpen;
  console.log(loginIsOpen);
  console.log(forgetIsOpen);
  console.log(signupIsOpen);
  if (loginIsOpen) {
    return (
      <Login
        isOpen={loginIsOpen}
        isLoginIsOpen={() => props.setLoginIsOpen(true)}
        isForgetIsOpen={() => props.setForgetIsOpen(false)}
        isSignupIsOpen={() => props.setSignupIsOpen(false)}
      />
    );
  } else if (forgetIsOpen) {
    return (
      <Forget
        isOpen={forgetIsOpen}
        setLoginIsOpen={() => props.setLoginIsOpen(false)}
        setForgetIsOpen={() => props.setForgetIsOpen(true)}
        setSignupIsOpen={() => props.setSignupIsOpen(false)}
      />
    );
  } else {
    return (
      <Signup
        isOpen={signupIsOpen}
        setLoginIsOpen={() => props.setLoginIsOpen(false)}
        setForgetIsOpen={() => props.setForgetIsOpen(false)}
        setSignupIsOpen={() => props.setSignupIsOpen(true)}
      />
    );
  }
};

OpenComponent.propTypes = {
  loginIsOpen: PropTypes.bool,
  signupIsOpen: PropTypes.bool,
  forgetIsOpen: PropTypes.bool,
  setLoginIsOpen: PropTypes.func,
  setSignupIsOpen: PropTypes.func,
  setForgetIsOpen: PropTypes.func,
};
