import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  beanIds: [],
};

const filtersSlice = createSlice({
  name: "beansFilters",
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload;
    },
    beanIdFilterChanged(state, action) {
      state.beanIds = action.payload;
    },
  },
});

export const { beanIdFilterChanged, statusFilterChanged } =
  filtersSlice.actions;

export default filtersSlice.reducer;
