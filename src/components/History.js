import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import FolderIcon from "@material-ui/icons/Folder";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const parseDate = (date) => new Date(date).toLocaleString();

const selectHistories = (state) => state.histories.histories;

export default function History(props) {
  const histories = useSelector(selectHistories);
  console.log(histories);
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <List>
        {Object.entries(histories).map(([date, history]) => (
          <ListItem button key={date} onClick={() => props.onClick(history)}>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${parseDate(date)} ${history.storeInfo.store}`}
              secondary={history.storeInfo.country}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => props.onClickDelete(history)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
History.propTypes = {
  headers: PropTypes.array,
  histories: PropTypes.object,
  onClick: PropTypes.func,
  onClickDelete: PropTypes.func,
};
