import { React, useState } from "react";

import BeanListItem from "./BeanListItem";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { selectFilteredBeanIds } from "./beansSlice";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    '& > * + *': {
      marginTop: theme.spacing(2),
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

  const editButtonLabel = !editable ? "Edit" : "Done";

  if (loadingStatus === "loading") {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        {editButtonLabel}
      </Button>
      <ul className={classes.root}>{renderedListItems}</ul>
    </div>
  );
};

export default BeanList;
