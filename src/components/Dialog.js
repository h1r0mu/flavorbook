import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";

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
