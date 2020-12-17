import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../rootReducer";
import { logger } from "redux-logger";

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

export default store;
