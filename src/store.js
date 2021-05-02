import beanReducer from "./features/newBean/beanSlice";
import beansReducer from "./features/myBeans/beansSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    bean: beanReducer,
    beans: beansReducer,
  },
});

export default store;
