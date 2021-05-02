import {
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
  Typography,
} from "@material-ui/core";

import PropTypes from "prop-types";
import React from "react";

export default function Dialog(props) {
  return (
    <MuiDialog
      onClose={props.onClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <DialogTitle id="customized-dialog-title">{props.title}</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{props.content}</Typography>
      </DialogContent>
    </MuiDialog>
  );
}

Dialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  content: PropTypes.string,
  title: PropTypes.string,
};
