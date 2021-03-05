import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import styled from "styled-components";

import Chip from "./Chip.js";
import Slider from "./Slider.js";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
    margin: "10%",
    marginTop: "0%",
  },
});

const StyledTypography = withStyles({
  h1: {
    textIndent: "0pt",
  },
  h2: {
    textIndent: "10%",
  },
})(Typography);

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const marks = {
  cleanCup: [
    {
      value: 0,
      label: "Not clean",
    },
    {
      value: 100,
      label: "Very clean",
    },
  ],
  mouseFeel1: [
    {
      value: 0,
      label: "Watery",
    },
    {
      value: 100,
      label: "Syropy",
    },
  ],
  mouseFeel2: [
    {
      value: 0,
      label: "Light",
    },
    {
      value: 100,
      label: "Heavy",
    },
  ],
  mouseFeel3: [
    {
      value: 0,
      label: "Soft",
    },
    {
      value: 100,
      label: "Spicy",
    },
  ],
  acidity1: [
    {
      value: 0,
      label: "Weak",
    },
    {
      value: 100,
      label: "Strong",
    },
  ],
  acidity2: [
    {
      value: 0,
      label: "Dark",
    },
    {
      value: 100,
      label: "Bright",
    },
  ],
  sweetness1: [
    {
      value: 0,
      label: "Weak",
    },
    {
      value: 100,
      label: "Strong",
    },
  ],
  sweetness2: [
    {
      value: 0,
      label: "Dark",
    },
    {
      value: 100,
      label: "Bright",
    },
  ],
  afterTaste1: [
    {
      value: 0,
      label: "Short",
    },
    {
      value: 100,
      label: "Long",
    },
  ],
  afterTaste2: [
    {
      value: 0,
      label: "Rough",
    },
    {
      value: 100,
      label: "Smooth",
    },
  ],
  afterTaste3: [
    {
      value: 0,
      label: "Light",
    },
    {
      value: 100,
      label: "Heavy",
    },
  ],
};

export default function Dev() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <StyledTypography variant="h1" gutterBottom>
          Flavors
        </StyledTypography>
        <StyledTypography variant="h2" gutterBottom>
          Level 1
        </StyledTypography>
        <Chip label="test" imagePath="../static/Big/fruity.jpg" />
        <Chip label="test" imagePath="../static/Big/floral.jpg" />
        <StyledTypography variant="h2" gutterBottom>
          Level 2
        </StyledTypography>
        <Chip label="test" imagePath="../static/Big/fruity.jpg" />
        <Chip label="test" imagePath="../static/Big/floral.jpg" />
        <StyledTypography variant="h2" gutterBottom>
          Level 3
        </StyledTypography>
        <Chip label="test" imagePath="../static/Big/fruity.jpg" />
        <Chip label="test" imagePath="../static/Big/floral.jpg" />
      </div>
      <div>
        <StyledTypography variant="h1" gutterBottom>
          Clean cup
        </StyledTypography>
        <Slider marks={marks.cleanCup} />
      </div>
      <div>
        <StyledTypography variant="h1" gutterBottom>
          Mouse feel
        </StyledTypography>
        <Slider marks={marks.mouseFeel1} />
        <Slider marks={marks.mouseFeel2} />
        <Slider marks={marks.mouseFeel3} />
        <Chip label="test" imagePath="../static/Big/fruity.jpg" />
      </div>
      <div>
        <StyledTypography variant="h1" gutterBottom>
          Acidity
        </StyledTypography>
        <Slider marks={marks.acidity1} />
        <Slider marks={marks.acidity2} />
        <Chip label="test" imagePath="../static/Big/fruity.jpg" />
      </div>
      <div>
        <StyledTypography variant="h1" gutterBottom>
          Sweetness
        </StyledTypography>
        <Slider marks={marks.sweetness1} />
        <Slider marks={marks.sweetness2} />
        <Chip label="test" imagePath="../static/Big/fruity.jpg" />
      </div>
      <div>
        <StyledTypography variant="h1" gutterBottom>
          After taste
        </StyledTypography>
        <Slider marks={marks.afterTaste1} />
        <Slider marks={marks.afterTaste2} />
        <Slider marks={marks.afterTaste3} />
        <Chip label="test" imagePath="../static/Big/fruity.jpg" />
      </div>
      <div>
        <StyledTypography variant="h1" gutterBottom>
          Harmony
        </StyledTypography>
        <StyledTypography variant="h2" gutterBottom>
          Too much
        </StyledTypography>
        <Chip label="test" imagePath="../static/Big/fruity.jpg" />
        <StyledTypography variant="h2" gutterBottom>
          Lack
        </StyledTypography>
        <Chip label="test" imagePath="../static/Big/fruity.jpg" />
      </div>
      <div>
        <StyledTypography variant="h1" gutterBottom>
          Overall
        </StyledTypography>
        <Rating
          name="customized-icons"
          defaultValue={0}
          getLabelText={(value) => customIcons[value].label}
          IconContainerComponent={IconContainer}
          size="large"
        />
      </div>
    </div>
  );
}
