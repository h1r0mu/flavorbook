import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { db } from "../../firebase";

const beansAdapter = createEntityAdapter();

export const fetchBeans = createAsyncThunk("beans/fetchBeans", async () => {
  const snapshot = await db.collection("cards").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
      });
  },
});

export default beansSlice.reducer;

export const {
  selectAll: selectBeans,
  selectById: selectBeanById,
} = beansAdapter.getSelectors((state) => state.beans);
