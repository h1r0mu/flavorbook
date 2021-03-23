import { applyMiddleware, createStore } from "redux";
import { load, save } from "redux-localstorage-simple";

import rootReducer from "./reducer";

const createStoreWithMiddleware = applyMiddleware(
  save() // Saving done here
)(createStore);

const store = createStoreWithMiddleware(
  rootReducer,
  load(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
