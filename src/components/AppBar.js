import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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

const styles = {
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
};

class ButtonAppBar extends React.Component {
  constructor() {
    super();
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.state = { drawerIsOpen: false };
  }

  handleDrawerOpen() {
    this.setState({ drawerIsOpen: true });
  }

  handleDrawerClose() {
    this.setState({ drawerIsOpen: false });
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={this.props.classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={this.props.classes.title}>
              Coffee Flavors
              <EmojiFoodBeverageIcon className={this.props.classes.coffee} />
            </Typography>
            <Button color="inherit">Login(coming soon)</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          classes={{
            paper: this.props.classes.drawerPaper,
          }}
          onEscapeKeyDown={this.handleDrawerClose}
          onBackdropClick={this.handleDrawerClose}
          open={this.state.drawerIsOpen}
        >
          <div className={this.props.classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <MenuIcon />
            </IconButton>
          </div>
          <div className={this.props.classes.drawerInner}>
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
}

ButtonAppBar.propTypes = {
  drawerIsOpen: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
