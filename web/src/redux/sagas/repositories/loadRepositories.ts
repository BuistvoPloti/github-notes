import { repositoriesAPI } from "../../../api/api";
import { setRepositories } from "../../Repository";
import { takeLatest, call, put } from "redux-saga/effects";
import { LOAD_REPOSITORIES } from "../../Repository/repository.types";
import { loadRepositories } from "../../Repository/repository.actions";

export function* loadRepositoriesWatcher() {
  yield takeLatest(LOAD_REPOSITORIES, loadRepositoriesFlow);
}

export function* loadRepositoriesFlow(action: ReturnType<typeof loadRepositories>) {
  const repositories = yield call(repositoriesAPI.getRepositories, action.payload.isAuth);
  yield put(setRepositories(repositories));
}