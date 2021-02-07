import PropTypes from "prop-types";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const parseDate = (date) => new Date(date).toLocaleString();

export default function History(props) {
  const classes = useStyles();

  return (
    <div className={classes.demo}>
      <List>
        {Object.entries(props.rows).map(([date, row]) => (
          <ListItem key={date} onClick={() => props.onClick(row.tiles)}>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${parseDate(date)} ${row.storeInfo.store}`}
              secondary={row.storeInfo.country}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => props.onClickDelete(row)}
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
  rows: PropTypes.object,
  onClick: PropTypes.func,
  onClickDelete: PropTypes.func,
};
