import { combineReducers } from "redux";

import historiesReducer from "./components/histories/historiesSlice";

const rootReducer = combineReducers({
  histories: historiesReducer,
});

export default rootReducer;
