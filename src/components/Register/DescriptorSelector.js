import { Box, GridList, GridListTile } from "@material-ui/core";
import React, { useState } from "react";
import { descriptorUpdate, selectDescriptorByName } from "./beanSlice.js";
import { useDispatch, useSelector } from "react-redux";

import Autocomplete from "../Autocomplete.js";
import Dialog from "../Dialog.js";
import PropTypes from "prop-types";
import Tile from "../Tile.js";

export default function DescriptorSelector({ title, name, options }) {
  const selectedDescriptors = useSelector((state) =>
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
            {selectedDescriptors.map((flavor) => (
              <GridListTile key={flavor.key} cols={null}>
                <Tile
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
    </Box>
  );
}

DescriptorSelector.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  cleanUp: PropTypes.func,
};
