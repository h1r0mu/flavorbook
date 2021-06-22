import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { db } from "../../firebase";

const beansAdapter = createEntityAdapter();

const serialize = (data) => {
  const serializedData = {};
  Object.entries(data).map(([key, value]) => {
    if (value instanceof Date) {
      serializedData[key] = value.toString();
    } else {
      serializedData[key] = value;
    }
  });
  return serializedData;
};
export const fetchBeans = createAsyncThunk("beans/fetchBeans", async () => {
  const snapshot = await db.collection("userBeans").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...serialize(doc.data()) }));
});

export const deleteBean = createAsyncThunk("beans/deleteBean", async (id) => {
  await db.collection("userBeans").doc(id).delete();
  return id;
});

const initialState = beansAdapter.getInitialState({
  status: "idle",
});

const beansSlice = createSlice({
  name: "beans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeans.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBeans.fulfilled, (state, action) => {
        beansAdapter.setAll(state, action.payload);
        state.status = "idle";
      })
      .addCase(deleteBean.fulfilled, (state, action) =>
        beansAdapter.removeOne(state, action.payload)
      );
  },
});

export const { beanDeleted } = beansSlice.actions;

export default beansSlice.reducer;

export const { selectAll: selectBeans, selectById: selectBeanById } =
  beansAdapter.getSelectors((state) => state.beans);

export const selectBeanIds = createSelector(selectBeans, (beans) => {
  return beans.map((bean) => bean.beanId);
});

export const selectCountries = createSelector(selectBeans, (beans) => {
  return beans.map((bean) => bean.country);
});

export const selectFilteredBeans = createSelector(
  // First input selector: all beans
  selectBeans,
  // Second input selector: all filter values
  (state) => state.beansFilters,
  // Output selector: receives both values
  (beans, filters) => {
    const { beanIds } = filters;
    const { countries } = filters;
    // const showAllCompletions = status === StatusFilters.All
    // if (showAllCompletions && colors.length === 0) {
    //   return beans
    // }
    if (beanIds.length === 0) {
      return beans
    }

    // Return either active or completed beans based on filter
    return beans.filter((bean) => {
      const beanIdMatches = beanIds.includes(bean.beanId);
      const countryMatches = countries.length === 0 || countries.includes(bean.country);
      return beanIdMatches && countryMatches;
      // return statusMatches && colorMatches
    });
  }
);

export const selectFilteredBeanIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilteredBeans,
  // And derive data in the output selector
  (filteredBeans) => filteredBeans.map((bean) => bean.id)
);
