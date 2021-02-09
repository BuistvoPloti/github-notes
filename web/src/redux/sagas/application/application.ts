import { authAPI } from "../../../api/api";
import { takeLatest, call, put } from "redux-saga/effects";
import { TRIGGER_INITIALIZE } from "../../App/app.types";
import { initializeAppAuth } from "../../App";
import { setAuthUserData } from "../../Auth";

export function*initializeAppWatcher() {
  yield takeLatest(TRIGGER_INITIALIZE, initializeAppFlow);
}

export function* initializeAppFlow() {
  const authDataResponse = yield call(authAPI.getAuthUserData);
  if (authDataResponse.data.data.auth) {
    yield put(initializeAppAuth(authDataResponse.data.data.auth));
    yield put(setAuthUserData(
      authDataResponse.data.data.userId,
      authDataResponse.data.data.login,
      true,
      authDataResponse.data.data.avatar_url
    ))
  } else {
    yield put(initializeAppAuth(false));
  }
}



