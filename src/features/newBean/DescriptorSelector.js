import { Box, GridList, GridListTile } from "@material-ui/core";
import React, { useState } from "react";
import { descriptorUpdate, selectDescriptorByName } from "./beanSlice.js";
import { useDispatch, useSelector } from "react-redux";

import Autocomplete from "../common/Autocomplete.js";
import Dialog from "../common/Dialog.js";
import PropTypes from "prop-types";
import Tile from "../common/Tile.js";

export default function DescriptorSelector({ title, name, options }) {
  const descriptors = useSelector((state) =>
    selectDescriptorByName(state, name)
  );
  const [openedDialog, setOpenedDialog] = useState(null);
  const dispatch = useDispatch();

  const open = (dialog) => {
    setOpenedDialog(dialog);
  };

  const close = () => {
    setOpenedDialog(null);
  };

  return (
    <Box>
      <Autocomplete
        title={title}
        label={name}
        options={options}
        getOptionLabel={(flavor) => flavor.name}
        getChipProps={(flavor) => ({
          label: flavor.name,
          imagePath: flavor.imageUrl,
        })}
        onChange={(event, value) => dispatch(descriptorUpdate(name, value))}
      >
        <div>
          <GridList cellHeight={"auto"} cols={6}>
            {descriptors.map((descriptor) => (
              <GridListTile key={descriptor.key} cols={null}>
                <Tile
                  key={descriptor.key}
                  value={descriptor.name}
                  imageUrl={descriptor.imageUrl}
                  onClick={() => open(descriptor)}
                />
                <Dialog
                  key={descriptor.key}
                  title={descriptor.name}
                  content={descriptor.description.repeat(1000)}
                  open={openedDialog === descriptor}
                  onClose={close}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Autocomplete>
    </Box>
  );
}

DescriptorSelector.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  cleanUp: PropTypes.func,
};
