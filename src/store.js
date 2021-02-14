import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducer";
import { save, load } from "redux-localstorage-simple";

const createStoreWithMiddleware = applyMiddleware(
  save() // Saving done here
)(createStore);

const store = createStoreWithMiddleware(
  rootReducer,
  load(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
