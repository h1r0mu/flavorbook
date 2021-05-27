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

export const selectBeanIds = createSelector(selectBeans, (beans) =>
  beans.map((bean) => bean.beanId)
);
