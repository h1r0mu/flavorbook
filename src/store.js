import beanReducer from "./components/Register/beanSlice";
import { configureStore } from "@reduxjs/toolkit";
import historiesReducer from "./components/histories/historiesSlice";

const store = configureStore({
  reducer: {
    histories: historiesReducer,
    bean: beanReducer,
  },
});

export default store;
