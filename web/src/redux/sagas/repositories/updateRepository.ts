import { repositoriesAPI } from "../../../api/api";
import { takeLatest, call } from "redux-saga/effects";
import { UPDATE_REPOSITORY } from "../../Repository/repository.types";
import { updateRepository } from "../../Repository";

export function* updateRepositoryWatcher() {
  yield takeLatest(UPDATE_REPOSITORY, updateRepositoryFlow);
}

export function* updateRepositoryFlow(action: ReturnType<typeof updateRepository>) {
  yield call(repositoriesAPI.updateRepositoryRequest, action.payload.repository, action.payload.repository.id);
}


