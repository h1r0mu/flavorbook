import ButtonBase from "@material-ui/core/ButtonBase";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // css設定
  root: {
    marginTop: 70,
    marginLeft: 0,
    marginBottom: 70,
    display: "flex",
    flexWrap: "wrap",
    minWidth: 200,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100% !mportant", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

function ButtonBases(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ButtonBase
        focusRipple
        key={props.value}
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
        onClick={props.onClick}
      >
        <span
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${props.url})`,
          }}
        />
        <span className={classes.imageBackdrop} />
        <span className={classes.imageButton}>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            className={classes.imageTitle}
          >
            {props.value}
            <span className={classes.imageMarked} />
          </Typography>
        </span>
      </ButtonBase>
    </div>
  );
}

ButtonBases.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  url: PropTypes.string,
};
export default ButtonBases;
