import {
  Typography as MuiTypography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export default withStyles({
  h1: {
    textIndent: "0pt",
  },
  h2: {
    textIndent: "0%",
  },
})(MuiTypography);
