import { React, useState } from "react";
import {
  descriptorNameEnum,
  descriptorValueEnum,
  saveNewBean,
  update,
} from "./beanSlice.js";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Autocomplete from "./Autocomplete";
import AutocompleteChip from "../common/Autocomplete";
import Button from "@material-ui/core/Button";
// import DescriptorSelector from "./DescriptorSelector";
import Rating from "./Rating.js";
import Slider from "./Slider.js";
import { GridList, GridListTile, Typography } from "@material-ui/core";
import firebase from "firebase/app";
import { flavorDescriptors } from "../../data/flavors";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../../firebase";
import { Grid } from "@material-ui/core";
import Tile from "../common/Tile";

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
  input: {
    display: "none",
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

const Form = ({ bean }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const post = () => {
    dispatch(saveNewBean(bean));
    if (image === null) {
      return;
    }
    const uploadImage = storage.child(`/member/${image.name}`).put(image);
    uploadImage.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      null,
      (error) => {
        throw error;
      },
      () => {
        setImage(null);
        setImageUrl("");
      }
    );
  };

  const handleLoad = (e) => {
    const image = e.target.files[0];
    setImage(image);
    setImageUrl(URL.createObjectURL(image));
    dispatch(update(descriptorNameEnum.PICTURE_URL, image.name));
  };

  const handleChange = (name) => {
    return (event, value) => dispatch(update(name, value));
  };

  const descriptorToTile = (descriptor) => (
    <GridListTile key={descriptor.key} cols={null}>
      <Tile
        key={descriptor.key}
        value={descriptor.name}
        imageUrl={descriptor.imageUrl}
        onClick={() => open(descriptor)}
      />
    </GridListTile>
  );

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h2" gutterBottom>
          Flavors
        </Typography>
        <AutocompleteChip
          label={descriptorNameEnum.FLAVOR_LEVEL1_DESCRIPTORS}
          options={Object.keys(flavorDescriptors)}
          getChipProps={(option) => ({
            label: flavorDescriptors[option].name,
            imagePath: flavorDescriptors[option].imageUrl,
          })}
          onChange={handleChange(descriptorNameEnum.FLAVOR_LEVEL1_DESCRIPTORS)}
          value={bean.flavorLevel1Descriptors}
        />
        <GridList cellHeight={"auto"} cols={6}>
          {bean.flavorLevel1Descriptors
            .map((descriptor) => flavorDescriptors[descriptor])
            .map(descriptorToTile)}
        </GridList>
      </div>
      <div>
        <Typography variant="h2" gutterBottom>
          Clean cup
        </Typography>
        <Slider
          name={descriptorNameEnum.CLEAN_CUP}
          marks={marks.cleanCup}
          value={bean.cleanCup}
        />
      </div>
      <div>
        <Typography variant="h2" gutterBottom>
          Mouse feel
        </Typography>
        <Slider
          name={descriptorNameEnum.MOUSE_FEEL1}
          marks={marks.mouseFeel1}
          value={bean.mouseFeel1}
        />
        <Slider
          name={descriptorNameEnum.MOUSE_FEEL2}
          marks={marks.mouseFeel2}
          value={bean.mouseFeel2}
        />
        <Slider
          name={descriptorNameEnum.MOUSE_FEEL3}
          marks={marks.mouseFeel3}
          value={bean.mouseFeel3}
        />
        <AutocompleteChip
          label={descriptorNameEnum.MOUSE_FEEL_DESCRIPTORS}
          options={Object.keys(flavorDescriptors)}
          getChipProps={(option) => ({
            label: flavorDescriptors[option].name,
            imagePath: flavorDescriptors[option].imageUrl,
          })}
          onChange={handleChange(descriptorNameEnum.MOUSE_FEEL_DESCRIPTORS)}
          value={bean.mouseFeelDescriptors}
        />
        <GridList cellHeight={"auto"} cols={6}>
          {bean.mouseFeelDescriptors
            .map((descriptor) => flavorDescriptors[descriptor])
            .map(descriptorToTile)}
        </GridList>
      </div>
      <div>
        <Typography variant="h2" gutterBottom>
          Acidity
        </Typography>
        <Slider
          name={descriptorNameEnum.ACIDITY1}
          marks={marks.acidity1}
          value={bean.acidity1}
        />
        <Slider
          name={descriptorNameEnum.ACIDITY2}
          marks={marks.acidity2}
          value={bean.acidity2}
        />
        <AutocompleteChip
          label={descriptorNameEnum.ACIDITY_DESCRIPTORS}
          options={Object.keys(flavorDescriptors)}
          getChipProps={(option) => ({
            label: flavorDescriptors[option].name,
            imagePath: flavorDescriptors[option].imageUrl,
          })}
          onChange={handleChange(descriptorNameEnum.ACIDITY_DESCRIPTORS)}
          value={bean.acidityDescriptors}
        />
        <GridList cellHeight={"auto"} cols={6}>
          {bean.acidityDescriptors
            .map((descriptor) => flavorDescriptors[descriptor])
            .map(descriptorToTile)}
        </GridList>
      </div>
      <div>
        <Typography variant="h2" gutterBottom>
          Sweetness
        </Typography>
        <Slider
          name={descriptorNameEnum.SWEETNESS1}
          marks={marks.sweetness1}
          value={bean.sweetness1}
        />
        <Slider
          name={descriptorNameEnum.SWEETNESS2}
          marks={marks.sweetness2}
          value={bean.sweetness2}
        />
        <AutocompleteChip
          label={descriptorNameEnum.SWEETNESS_DESCRIPTORS}
          options={Object.keys(flavorDescriptors)}
          getChipProps={(option) => ({
            label: flavorDescriptors[option].name,
            imagePath: flavorDescriptors[option].imageUrl,
          })}
          onChange={handleChange(descriptorNameEnum.SWEETNESS_DESCRIPTORS)}
          value={bean.sweetnessDescriptors}
        />
        <GridList cellHeight={"auto"} cols={6}>
          {bean.sweetnessDescriptors
            .map((descriptor) => flavorDescriptors[descriptor])
            .map(descriptorToTile)}
        </GridList>
      </div>
      <div>
        <Typography variant="h2" gutterBottom>
          After taste
        </Typography>
        <Slider
          name={descriptorNameEnum.AFTER_TASTE1}
          marks={marks.afterTaste1}
          value={bean.afterTaste1}
        />
        <Slider
          name={descriptorNameEnum.AFTER_TASTE2}
          marks={marks.afterTaste2}
          value={bean.afterTaste2}
        />
        <Slider
          name={descriptorNameEnum.AFTER_TASTE3}
          marks={marks.afterTaste3}
          value={bean.afterTaste3}
        />
        <AutocompleteChip
          label={descriptorNameEnum.AFTER_TASTE_DESCRIPTORS}
          options={Object.keys(flavorDescriptors)}
          getChipProps={(option) => ({
            label: flavorDescriptors[option].name,
            imagePath: flavorDescriptors[option].imageUrl,
          })}
          onChange={handleChange(descriptorNameEnum.AFTER_TASTE_DESCRIPTORS)}
          value={bean.afterTasteDescriptors}
        />
        <GridList cellHeight={"auto"} cols={6}>
          {bean.afterTasteDescriptors
            .map((descriptor) => flavorDescriptors[descriptor])
            .map(descriptorToTile)}
        </GridList>
      </div>
      <div>
        <Typography variant="h2" gutterBottom>
          Harmony
        </Typography>
        <AutocompleteChip
          label={descriptorNameEnum.HARMONY_TOO_MUCH_DESCRIPTORS}
          options={Object.keys(flavorDescriptors)}
          getChipProps={(option) => ({
            label: flavorDescriptors[option].name,
            imagePath: flavorDescriptors[option].imageUrl,
          })}
          onChange={handleChange(
            descriptorNameEnum.HARMONY_TOO_MUCH_DESCRIPTORS
          )}
          value={bean.harmonyTooMuchDescriptors}
        />
        <GridList cellHeight={"auto"} cols={6}>
          {bean.harmonyTooMuchDescriptors
            .map((descriptor) => flavorDescriptors[descriptor])
            .map(descriptorToTile)}
        </GridList>
        <AutocompleteChip
          label={descriptorNameEnum.HARMONY_POOR_DESCRIPTORS}
          options={Object.keys(flavorDescriptors)}
          getChipProps={(option) => ({
            label: flavorDescriptors[option].name,
            imagePath: flavorDescriptors[option].imageUrl,
          })}
          onChange={handleChange(descriptorNameEnum.HARMONY_POOR_DESCRIPTORS)}
          value={bean.harmonyPoorDescriptors}
        />
        <GridList cellHeight={"auto"} cols={6}>
          {bean.harmonyPoorDescriptors
            .map((descriptor) => flavorDescriptors[descriptor])
            .map(descriptorToTile)}
        </GridList>
      </div>
      <div>
        <Typography variant="h2" gutterBottom>
          Overall
        </Typography>
        <Rating name={descriptorNameEnum.OVERALL} />
      </div>
      <Grid container spacing={10}>
        <Grid item xs>
          <Autocomplete
            name={descriptorNameEnum.STORE}
            options={[]}
            value={bean.store}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            name={descriptorNameEnum.COUNTRY}
            options={["Ethiopia", "Brazil"]}
            value={bean.country}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            name={descriptorNameEnum.REGION}
            options={[]}
            value={bean.region}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            name={descriptorNameEnum.FARM}
            options={[]}
            value={bean.farm}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            name={descriptorNameEnum.PROCESS}
            options={["Washed", "Natural"]}
            value={bean.process}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            name={descriptorNameEnum.GRIND}
            options={[]}
            value={bean.grind}
          />
        </Grid>
      </Grid>
      <div>
        <input
          accept="image/*"
          id="contained-button-file"
          className={classes.input}
          multiple
          type="file"
          onChange={handleLoad}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
      </div>
      <div>
        <img style={{ width: "10%" }} src={imageUrl} />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={post}>
          Save
        </Button>
      </div>
    </div>
  );
};

Form.propTypes = {
  bean: PropTypes.object,
};

export default Form;
