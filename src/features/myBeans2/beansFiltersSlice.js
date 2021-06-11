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
    beanIdFilterChanged: {
      reducer(state, action) {
        let { beanId, changeType } = action.payload;
        const { beanIds } = state;
        switch (changeType) {
          case "added": {
            if (!beanIds.includes(beanId)) {
              beanIds.push(beanId);
            }
            break;
          }
          case "removed": {
            state.beanIds = beanIds.filter(
              (existingColor) => existingColor !== beanId
            );
            break;
          }
          default:
            return;
        }
      },
      prepare(beanId, changeType) {
        return {
          payload: { beanId, changeType },
        };
      },
    },
  },
});

export const { beanIdFilterChanged, statusFilterChanged } =
  filtersSlice.actions;

export default filtersSlice.reducer;
