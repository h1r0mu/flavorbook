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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#795548",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const styles = {
  root: {
    flexGrow: 1,
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
      <ThemeProvider theme={theme}>
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
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="persistent"
            classes={{
              paper: this.props.classes.drawerPaper,
            }}
            open={this.state.drawerIsOpen}
          >
            <div className={this.props.classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <MenuIcon />
              </IconButton>
            </div>
            <div className={this.props.classes.drawerInner}>
              <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map(
                  (text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  )
                )}
              </List>
            </div>
          </Drawer>
        </div>
      </ThemeProvider>
    );
  }
}

ButtonAppBar.propTypes = {
  drawerIsOpen: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
