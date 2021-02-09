import createSagaMiddleware from "redux-saga"
import rootReducer from "../rootReducer";
import { logger } from "redux-logger";
import { rootSaga } from "../rootSaga";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();
const devMode = process.env.REACT_APP_NODE_ENV === 'development';
const middleware = [...getDefaultMiddleware({ thunk: true }), sagaMiddleware];

if (devMode) {
  middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;

