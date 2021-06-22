import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { db } from "../../firebase";

const beansAdapter = createEntityAdapter();

const fetchBean = async (beanId) => {
  const doc = await db.collection("beans").doc(beanId).get();
  return doc.exists ? doc.data() : {};
};

export const fetchBeans = createAsyncThunk("beans/fetchBeans", async () => {
  const snapshot = await db.collection("userBeans").get();
  let userBeans = snapshot.docs.map((doc) => doc.data());
  userBeans = await Promise.all(
    userBeans.map(async (userBean) => {
      const bean = await fetchBean(userBean.beanId);
      return { ...bean, ...userBean };
    })
  );
  return userBeans;
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
  return beans.map((bean) => bean.id);
});

export const selectBeanBeanIds = createSelector(selectBeans, (beans) => {
  return beans.map((bean) => bean.beanId);
});

export const selectBeanCountries = createSelector(selectBeans, (beans) => {
  return beans.map((bean) => bean.country);
});

export const selectFilteredBeans = createSelector(
  selectBeans,
  (state) => state.beansFilters,
  (beans, filters) => {
    const { beanIds, countries } = filters;

    return beans.filter((bean) => {
      const beanIdMatches = beanIds.length === 0 || beanIds === bean.beanId;
      const countryMatches =
        countries.length === 0 || countries === bean.country;
      return countryMatches && beanIdMatches;
    });
  }
);

export const selectFilteredBeanIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilteredBeans,
  // And derive data in the output selector
  (filteredBeans) => filteredBeans.map((bean) => bean.id)
);
