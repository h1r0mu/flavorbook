import {
  SentimentDissatisfied as SentimentDissatisfiedIcon,
  SentimentSatisfiedAlt as SentimentSatisfiedAltIcon,
  SentimentSatisfied as SentimentSatisfiedIcon,
  SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
  SentimentVerySatisfied as SentimentVerySatisfiedIcon,
} from "@material-ui/icons";

import DescriptorSelector from "./DescriptorSelector";
import PropTypes from "prop-types";
import { Rating } from "@material-ui/lab";
import React from "react";
import Slider from "./Slider.js";
import { Typography } from "@material-ui/core";
import { descriptorEnum } from "./beanSlice.js";
import { flavorData } from "../../data/flavors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    width: "80%",
    margin: "10%",
    marginTop: "0%",
  },
  iconButton: {
    padding: 10,
  },
  searchField: {
    width: "50%",
  },
}));

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

const marks = {
  cleanCup: [
    {
      value: 0,
      label: "Not clean",
    },
    {
      value: 10,
      label: "Very clean",
    },
  ],
  mouseFeel1: [
    {
      value: 0,
      label: "Watery",
    },
    {
      value: 10,
      label: "Syropy",
    },
  ],
  mouseFeel2: [
    {
      value: 0,
      label: "Light",
    },
    {
      value: 10,
      label: "Heavy",
    },
  ],
  mouseFeel3: [
    {
      value: 0,
      label: "Soft",
    },
    {
      value: 10,
      label: "Spicy",
    },
  ],
  acidity1: [
    {
      value: 0,
      label: "Weak",
    },
    {
      value: 10,
      label: "Strong",
    },
  ],
  acidity2: [
    {
      value: 0,
      label: "Dark",
    },
    {
      value: 10,
      label: "Bright",
    },
  ],
  sweetness1: [
    {
      value: 0,
      label: "Weak",
    },
    {
      value: 10,
      label: "Strong",
    },
  ],
  sweetness2: [
    {
      value: 0,
      label: "Dark",
    },
    {
      value: 10,
      label: "Bright",
    },
  ],
  afterTaste1: [
    {
      value: 0,
      label: "Short",
    },
    {
      value: 10,
      label: "Long",
    },
  ],
  afterTaste2: [
    {
      value: 0,
      label: "Rough",
    },
    {
      value: 10,
      label: "Smooth",
    },
  ],
  afterTaste3: [
    {
      value: 0,
      label: "Light",
    },
    {
      value: 10,
      label: "Heavy",
    },
  ],
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export function createFlavors(flavorData) {
  const flavors = [];
  flavorData.forEach(([name, level, parentName, imageUrl]) => {
    flavors.push({
      name: name,
      level: level,
      key: `${name}${level}`,
      imageUrl: imageUrl,
      parent: flavors.find(
        (flavor) => flavor.name === parentName && flavor.level === level - 1
      ),
      description: name,
    });
  });
  return flavors;
}

export default function Expert() {
  const classes = useStyles();

  const flavors = createFlavors(flavorData);

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h1" gutterBottom>
          Flavors
        </Typography>
        <DescriptorSelector
          title="Level 1"
          name={descriptorEnum.FLAVOR_LEVEL1_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
        <DescriptorSelector
          title="Level 2"
          name={descriptorEnum.FLAVOR_LEVEL2_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 1)}
        />
        <DescriptorSelector
          title="Level 3"
          name={descriptorEnum.FLAVOR_LEVEL3_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 2)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Clean cup
        </Typography>
        <Slider marks={marks.cleanCup} />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Mouse feel
        </Typography>
        <Slider marks={marks.mouseFeel1} />
        <Slider marks={marks.mouseFeel2} />
        <Slider marks={marks.mouseFeel3} />
        <DescriptorSelector
          name={descriptorEnum.MOUSE_FEEL_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Acidity
        </Typography>
        <Slider marks={marks.acidity1} />
        <Slider marks={marks.acidity2} />
        <DescriptorSelector
          name={descriptorEnum.ACIDITY_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Sweetness
        </Typography>
        <Slider marks={marks.sweetness1} />
        <Slider marks={marks.sweetness2} />
        <DescriptorSelector
          name={descriptorEnum.SWEETNESS_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          After taste
        </Typography>
        <Slider marks={marks.afterTaste1} />
        <Slider marks={marks.afterTaste2} />
        <Slider marks={marks.afterTaste3} />
        <DescriptorSelector
          name={descriptorEnum.AFTER_TASTE_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Harmony
        </Typography>
        <Typography variant="h2" gutterBottom>
          Too much
        </Typography>
        <DescriptorSelector
          name={descriptorEnum.HARMONY_TOO_MUCH_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
        <Typography variant="h2" gutterBottom>
          Poor
        </Typography>
        <DescriptorSelector
          name={descriptorEnum.HARMONY_POOR_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Overall
        </Typography>
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

IconContainer.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
