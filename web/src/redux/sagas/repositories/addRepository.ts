import { repositoriesAPI } from "../../../api/api";
import { setRepositories } from "../../Repository";
import { takeLatest, call, put } from "redux-saga/effects";
import { ADD_REPOSITORY } from "../../Repository/repository.types";
import { addRepository } from "../../Repository";

export function* addRepositoryWatcher() {
  yield takeLatest(ADD_REPOSITORY, addRepositoryFlow);
}

export function* addRepositoryFlow(action: ReturnType<typeof addRepository>) {
  yield call(repositoriesAPI.createRepositoryRequest, action.payload.repository);
  const repositories = yield call(repositoriesAPI.getRepositories);
  yield put(setRepositories(repositories));
}