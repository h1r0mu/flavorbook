import beanReducer from "./components/Register/beanSlice";
import beansReducer from "./features/myBeans/beansSlice";
import { configureStore } from "@reduxjs/toolkit";
import historiesReducer from "./components/histories/historiesSlice";

const store = configureStore({
  reducer: {
    histories: historiesReducer,
    bean: beanReducer,
    beans: beansReducer,
  },
});

export default store;
