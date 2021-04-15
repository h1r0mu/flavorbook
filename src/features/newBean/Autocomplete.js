import { descriptorUpdate, selectDescriptorByName } from "./beanSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { Autocomplete as BaseAutocomplete } from "../common/Autocomplete.js";
import PropTypes from "prop-types";
import React from "react";

export default function Autocomplete({ title, name, options }) {
  const value = useSelector((state) => selectDescriptorByName(state, name));
  const dispatch = useDispatch();

  return (
    <BaseAutocomplete
      title={title}
      options={options}
      getOptionLabel={(flavor) => flavor.name}
      onChange={(event, value) => dispatch(descriptorUpdate(name, value))}
    >
      {value}
    </BaseAutocomplete>
  );
}

Autocomplete.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
};
