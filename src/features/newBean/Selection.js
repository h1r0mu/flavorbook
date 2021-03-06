import { React, useState } from "react";
import {
  descriptorNameEnum,
  descriptorValueEnum,
  saveNewBean,
} from "./beanSlice.js";
import { useDispatch, useSelector } from "react-redux";

import Autocomplete from "./Autocomplete";
import Button from "@material-ui/core/Button";
import DescriptorSelector from "./DescriptorSelector";
import Rating from "./Rating.js";
import Slider from "./Slider.js";
import { Typography } from "@material-ui/core";
import { descriptorUpdate } from "./beanSlice.js";
import firebase from "firebase/app";
import { flavorData } from "../../data/flavors";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../../firebase";
import { Grid } from "@material-ui/core";

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

export default function Selection() {
  const dispatch = useDispatch();
  const bean = useSelector((state) => state.bean);
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const flavors = createFlavors(flavorData);

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
    dispatch(descriptorUpdate(descriptorNameEnum.PICTURE_URL, image.name));
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h2" gutterBottom>
          Flavors
        </Typography>
        <DescriptorSelector
          name={descriptorNameEnum.FLAVOR_LEVEL1_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
        {/* <DescriptorSelector
          name={descriptorNameEnum.FLAVOR_LEVEL2_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 1)}
        />
        <DescriptorSelector
          name={descriptorNameEnum.FLAVOR_LEVEL3_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 2)}
        /> */}
      </div>
      <div>
        <Typography variant="h2" gutterBottom>
          Clean cup
        </Typography>
        <Slider name={descriptorNameEnum.CLEAN_CUP} marks={marks.cleanCup} />
      </div>
      <div>
        <Typography variant="h2" gutterBottom>
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
        <Typography variant="h2" gutterBottom>
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
        <Typography variant="h2" gutterBottom>
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
        <Typography variant="h2" gutterBottom>
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
        <Typography variant="h2" gutterBottom>
          Harmony
        </Typography>
        <DescriptorSelector
          name={descriptorNameEnum.HARMONY_TOO_MUCH_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
        <DescriptorSelector
          name={descriptorNameEnum.HARMONY_POOR_DESCRIPTORS}
          options={flavors.filter((flavor) => flavor.level == 0)}
        />
      </div>
      <div>
        <Typography variant="h2" gutterBottom>
          Overall
        </Typography>
        <Rating name={descriptorNameEnum.OVERALL} />
      </div>
      <Grid container spacing={10}>
        <Grid item xs>
          <Autocomplete name={descriptorNameEnum.STORE} options={[]} />
        </Grid>
        <Grid item xs>
          <Autocomplete
            name={descriptorNameEnum.COUNTRY}
            options={["Ethiopia", "Brazil"]}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete name={descriptorNameEnum.REGION} options={[]} />
        </Grid>
        <Grid item xs>
          <Autocomplete name={descriptorNameEnum.FARM} options={[]} />
        </Grid>
        <Grid item xs>
          <Autocomplete
            name={descriptorNameEnum.PROCESS}
            options={["Washed", "Natural"]}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete name={descriptorNameEnum.GRIND} options={[]} />
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
}
