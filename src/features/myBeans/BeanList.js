import { React, useState } from "react";

import BeanListItem from "./BeanListItem";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { selectFilteredBeanIds } from "./beansSlice";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Create";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  chips: {
    display: "flex",
    maxWidth: 1000,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 8,
      },
    },
  },
}));

const BeanList = () => {
  const classes = useStyles();
  const beanIds = useSelector(selectFilteredBeanIds);
  const [editable, setEditable] = useState(false);

  const renderedListItems = beanIds.map((beanId) => {
    return <BeanListItem key={beanId} id={beanId} editable={editable} />;
  });

  const handleClick = () => {
    setEditable(!editable);
  };

  const loadingStatus = useSelector((state) => state.beans.status);

  if (loadingStatus === "loading") {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className={classes.chips}>
        <Link to="/selection">
          <Button variant="contained" onClick={handleClick}>
            <CreateIcon />
          </Button>
        </Link>
        <Button variant="contained" onClick={handleClick}>
          <EditIcon />
        </Button>
      </div>
      <ul className={classes.root}>{renderedListItems}</ul>
    </div>
  );
};

export default BeanList;
