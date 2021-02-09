import { repositoriesAPI } from "../../../api/api";
import { setRepositories } from "../../Repository";
import { takeLatest, call, put } from "redux-saga/effects";
import { SET_REPOSITORIES } from "../../Repository/repository.types";

export function* setRepositoriesWatcher() {
  yield takeLatest(SET_REPOSITORIES, setRepositoriesFlow);
}

export function* setRepositoriesFlow() {
  const repositories = yield call(repositoriesAPI.getRepositories, false);
  yield put(setRepositories(repositories))
}