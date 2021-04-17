import {
  descriptorNameEnum,
  descriptorValueEnum,
  saveNewBean,
} from "./beanSlice.js";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button.js";
import DescriptorSelector from "./DescriptorSelector";
import Rating from "./Rating.js";
import React from "react";
import Slider from "./Slider.js";
import { Typography } from "@material-ui/core";
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

const marks = {
  cleanCup: [
    {
      value: descriptorValueEnum.MIN,
      label: "Not clean",
    },
    {
      value: descriptorValueEnum.MAX,
      label: "Very clean",
    },
  ],
  mouseFeel1: [
    {
      value: descriptorValueEnum.MIN,
      label: "Watery",
    },
    {
      value: descriptorValueEnum.MAX,
      label: "Syropy",
    },
  ],
  mouseFeel2: [
    {
      value: descriptorValueEnum.MIN,
      label: "Light",
    },
    {
      value: descriptorValueEnum.MAX,
      label: "Heavy",
    },
  ],
  mouseFeel3: [
    {
      value: descriptorValueEnum.MIN,
      label: "Soft",
    },
    {
      value: descriptorValueEnum.MAX,
      label: "Spicy",
    },
  ],
  acidity1: [
    {
      value: descriptorValueEnum.MIN,
      label: "Weak",
    },
    {
      value: descriptorValueEnum.MAX,
      label: "Strong",
    },
  ],
  acidity2: [
    {
      value: descriptorValueEnum.MIN,
      label: "Dark",
    },
    {
      value: descriptorValueEnum.MAX,
      label: "Bright",
    },
  ],
  sweetness1: [
    {
      value: descriptorValueEnum.MIN,
      label: "Weak",
    },
    {
      value: descriptorValueEnum.MAX,
      label: "Strong",
    },
  ],
  sweetness2: [
    {
      value: descriptorValueEnum.MIN,
      label: "Dark",
    },
    {
      value: descriptorValueEnum.MAX,
      label: "Bright",
    },
  ],
  afterTaste1: [
    {
      value: descriptorValueEnum.MIN,
      label: "Short",
    },
    {
      value: descriptorValueEnum.MAX,
      label: "Long",
    },
  ],
  afterTaste2: [
    {
      value: descriptorValueEnum.MIN,
      label: "Rough",
    },
    {
      value: descriptorValueEnum.MAX,
      label: "Smooth",
    },
  ],
  afterTaste3: [
    {
      value: descriptorValueEnum.MIN,
      label: "Light",
    },
    {
      value: descriptorValueEnum.MAX,
      label: "Heavy",
    },
  ],
};

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
  const dispatch = useDispatch();
  const bean = useSelector((state) => state.bean);
  const classes = useStyles();

  const flavors = createFlavors(flavorData);

  const post = () => {
    dispatch(saveNewBean(bean));
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h1" gutterBottom>
          Flavors
        </Typography>
        <DescriptorSelector
          title="Level 1"
          name={descriptorNameEnum.FLAVOR_LEVEL1_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
        <DescriptorSelector
          title="Level 2"
          name={descriptorNameEnum.FLAVOR_LEVEL2_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 1)}
        />
        <DescriptorSelector
          title="Level 3"
          name={descriptorNameEnum.FLAVOR_LEVEL3_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 2)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Clean cup
        </Typography>
        <Slider name={descriptorNameEnum.CLEAN_CUP} marks={marks.cleanCup} />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Mouse feel
        </Typography>
        <Slider
          name={descriptorNameEnum.MOUSE_FEEL1}
          marks={marks.mouseFeel1}
        />
        <Slider
          name={descriptorNameEnum.MOUSE_FEEL2}
          marks={marks.mouseFeel2}
        />
        <Slider
          name={descriptorNameEnum.MOUSE_FEEL3}
          marks={marks.mouseFeel3}
        />
        <DescriptorSelector
          name={descriptorNameEnum.MOUSE_FEEL_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Acidity
        </Typography>
        <Slider name={descriptorNameEnum.ACIDITY1} marks={marks.acidity1} />
        <Slider name={descriptorNameEnum.ACIDITY2} marks={marks.acidity2} />
        <DescriptorSelector
          name={descriptorNameEnum.ACIDITY_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Sweetness
        </Typography>
        <Slider name={descriptorNameEnum.SWEETNESS1} marks={marks.sweetness1} />
        <Slider name={descriptorNameEnum.SWEETNESS2} marks={marks.sweetness2} />
        <DescriptorSelector
          name={descriptorNameEnum.SWEETNESS_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          After taste
        </Typography>
        <Slider
          name={descriptorNameEnum.AFTER_TASTE1}
          marks={marks.afterTaste1}
        />
        <Slider
          name={descriptorNameEnum.AFTER_TASTE2}
          marks={marks.afterTaste2}
        />
        <Slider
          name={descriptorNameEnum.AFTER_TASTE3}
          marks={marks.afterTaste3}
        />
        <DescriptorSelector
          name={descriptorNameEnum.AFTER_TASTE_DESCRIPTORS}
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
          name={descriptorNameEnum.HARMONY_TOO_MUCH_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
        <Typography variant="h2" gutterBottom>
          Poor
        </Typography>
        <DescriptorSelector
          name={descriptorNameEnum.HARMONY_POOR_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Overall
        </Typography>
        <Rating name={descriptorNameEnum.OVERALL} />
      </div>
      <Button onClick={post} text="Save" />
    </div>
  );
}
