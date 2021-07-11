import beanReducer from "./features/newBean/beanSlice";
import beansReducer from "./features/myBeans/beansSlice";
import beansFiltersReducer from "./features/myBeans/beansFiltersSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    bean: beanReducer,
    beans: beansReducer,
    beansFilters: beansFiltersReducer,
  },
});

export default store;
