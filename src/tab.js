import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { createMuiTheme } from "@material-ui/core/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}
const theme = createMuiTheme({
  palette: {
    success: {
      main: "#4caf50",
    },
    secondary: {
      main: "#00bcd4",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles(theme);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="電話番号" icon={<PhoneIcon />} {...a11yProps(0)} />
          <Tab
            label="お気に入りのコーヒー"
            icon={<FavoriteIcon />}
            {...a11yProps(1)}
          />
          <Tab
            label="フレンド情報"
            icon={<PersonPinIcon />}
            {...a11yProps(2)}
          />
          <Tab label="Q&A" icon={<HelpIcon />} {...a11yProps(3)} />
          <Tab label="購入" icon={<ShoppingBasket />} {...a11yProps(4)} />
          <Tab label="高評価" icon={<ThumbUp />} {...a11yProps(5)} />
        </Tabs>
      </AppBar>
    </div>
  );
}
