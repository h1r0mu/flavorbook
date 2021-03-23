import { GridList, GridListTile } from "@material-ui/core";
import React, { useState } from "react";
import {
  SentimentDissatisfied as SentimentDissatisfiedIcon,
  SentimentSatisfiedAlt as SentimentSatisfiedAltIcon,
  SentimentSatisfied as SentimentSatisfiedIcon,
  SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
  SentimentVerySatisfied as SentimentVerySatisfiedIcon,
} from "@material-ui/icons";

import Autocomplete from "./Autocomplete.js";
import Dialog from "../Dialog.js";
import PropTypes from "prop-types";
import { Rating } from "@material-ui/lab";
import Slider from "../Slider.js";
import Tile from "../Tile.js";
import Typography from "./Typography.js";
import { flavorData } from "../../data/flavors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    width: "80%",
    margin: "10%",
    marginTop: "0%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
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

function createFlavors(flavorData) {
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
const flavors = createFlavors(flavorData);

export default function Expert() {
  const classes = useStyles();
  const [selectedFlavorsLv0, setSelectedFlavorsLv0] = useState([]);
  const [selectedFlavorsLv1, setSelectedFlavorsLv1] = useState([]);
  const [selectedFlavorsLv2, setSelectedFlavorsLv2] = useState([]);
  const [openedDialog, setOpenedDialog] = useState(null);

  const select = (setter, event, value) => {
    setter(value);
  };

  const open = (dialog) => {
    setOpenedDialog(dialog);
  };

  const close = () => {
    setOpenedDialog(null);
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h1" gutterBottom>
          Flavors
        </Typography>
        <Autocomplete
          title="Level 1"
          options={flavors.filter((flavor) => flavor.level == 0)}
          getOptionLabel={(flavor) => flavor.name}
          getChipProps={(flavor) => ({
            label: flavor.name,
            imagePath: flavor.imageUrl,
          })}
          onChange={(...args) => select(setSelectedFlavorsLv0, ...args)}
        >
          <div>
            <GridList cellHeight={"auto"} className={classes.gridList} cols={6}>
              {selectedFlavorsLv0.map((flavor) => (
                <GridListTile key={flavor.key} cols={null}>
                  <Tile
                    className={classes.list}
                    key={flavor.key}
                    value={flavor.name}
                    imageUrl={flavor.imageUrl}
                    onClick={() => open(flavor)}
                  />
                  <Dialog
                    key={flavor.key}
                    title={flavor.name}
                    content={flavor.description.repeat(1000)}
                    open={openedDialog === flavor}
                    onClose={close}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Autocomplete>
        <Autocomplete
          title="Level 2"
          options={flavors.filter((flavor) => flavor.level == 1)}
          getOptionLabel={(flavor) => flavor.name}
          getChipProps={(flavor) => ({
            label: flavor.name,
            imagePath: flavor.imageUrl,
          })}
          onChange={(...args) => select(setSelectedFlavorsLv1, ...args)}
        >
          <div>
            <GridList cellHeight={"auto"} className={classes.gridList} cols={6}>
              {selectedFlavorsLv1.map((flavor) => (
                <GridListTile key={flavor.key} cols={null}>
                  <Tile
                    className={classes.list}
                    key={flavor.key}
                    value={flavor.name}
                    imageUrl={flavor.imageUrl}
                    onClick={() => open(flavor)}
                  />
                  <Dialog
                    key={flavor.key}
                    title={flavor.name}
                    content={flavor.description.repeat(1000)}
                    open={openedDialog === flavor}
                    onClose={close}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Autocomplete>
        <Autocomplete
          title="Level 3"
          options={flavors.filter((flavor) => flavor.level == 2)}
          getOptionLabel={(flavor) => flavor.name}
          getChipProps={(flavor) => ({
            label: flavor.name,
            imagePath: flavor.imageUrl,
          })}
          onChange={(...args) => select(setSelectedFlavorsLv2, ...args)}
        >
          <div>
            <GridList cellHeight={"auto"} className={classes.gridList} cols={6}>
              {selectedFlavorsLv2.map((flavor) => (
                <GridListTile key={flavor.key} cols={null}>
                  <Tile
                    className={classes.list}
                    key={flavor.key}
                    value={flavor.name}
                    imageUrl={flavor.imageUrl}
                    onClick={() => open(flavor)}
                  />
                  <Dialog
                    key={flavor.key}
                    title={flavor.name}
                    content={flavor.description.repeat(1000)}
                    open={openedDialog === flavor}
                    onClose={close}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Autocomplete>
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
        <Autocomplete
          options={flavors.filter((flavor) => flavor.level == 0)}
          getOptionLabel={(flavor) => flavor.name}
          getChipProps={(flavor) => ({
            label: flavor.name,
            imagePath: flavor.imageUrl,
          })}
          onChange={(...args) => select(setSelectedFlavorsLv0, ...args)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Acidity
        </Typography>
        <Slider marks={marks.acidity1} />
        <Slider marks={marks.acidity2} />
        <Autocomplete
          options={flavors.filter((flavor) => flavor.level == 0)}
          getOptionLabel={(flavor) => flavor.name}
          getChipProps={(flavor) => ({
            label: flavor.name,
            imagePath: flavor.imageUrl,
          })}
          onChange={(...args) => select(setSelectedFlavorsLv0, ...args)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Sweetness
        </Typography>
        <Slider marks={marks.sweetness1} />
        <Slider marks={marks.sweetness2} />
        <Autocomplete
          options={flavors.filter((flavor) => flavor.level == 0)}
          getOptionLabel={(flavor) => flavor.name}
          getChipProps={(flavor) => ({
            label: flavor.name,
            imagePath: flavor.imageUrl,
          })}
          onChange={(...args) => select(setSelectedFlavorsLv0, ...args)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          After taste
        </Typography>
        <Slider marks={marks.afterTaste1} />
        <Slider marks={marks.afterTaste2} />
        <Slider marks={marks.afterTaste3} />
        <Autocomplete
          options={flavors.filter((flavor) => flavor.level == 0)}
          getOptionLabel={(flavor) => flavor.name}
          getChipProps={(flavor) => ({
            label: flavor.name,
            imagePath: flavor.imageUrl,
          })}
          onChange={(...args) => select(setSelectedFlavorsLv0, ...args)}
        />
      </div>
      <div>
        <Typography variant="h1" gutterBottom>
          Harmony
        </Typography>
        <Typography variant="h2" gutterBottom>
          Too much
        </Typography>
        <Autocomplete
          options={flavors.filter((flavor) => flavor.level == 0)}
          getOptionLabel={(flavor) => flavor.name}
          getChipProps={(flavor) => ({
            label: flavor.name,
            imagePath: flavor.imageUrl,
          })}
          onChange={(...args) => select(setSelectedFlavorsLv0, ...args)}
        />
        <Typography variant="h2" gutterBottom>
          Lack
        </Typography>
        <Autocomplete
          options={flavors.filter((flavor) => flavor.level == 0)}
          getOptionLabel={(flavor) => flavor.name}
          getChipProps={(flavor) => ({
            label: flavor.name,
            imagePath: flavor.imageUrl,
          })}
          onChange={(...args) => select(setSelectedFlavorsLv0, ...args)}
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