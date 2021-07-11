import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  beanIds: [],
  countries: [],
};

const filtersSlice = createSlice({
  name: "beansFilters",
  initialState,
  reducers: {
    countryFilterChanged(state, action) {
      state.countries = action.payload;
    },
    beanIdFilterChanged(state, action) {
      state.beanIds = action.payload;
    },
  },
});

export const { beanIdFilterChanged, countryFilterChanged } =
  filtersSlice.actions;

export default filtersSlice.reducer;
