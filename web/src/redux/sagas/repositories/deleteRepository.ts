import { repositoriesAPI } from "../../../api/api";
import { takeLatest, call } from "redux-saga/effects";
import { DELETE_REPOSITORY } from "../../Repository/repository.types";
import { deleteRepository} from "../../Repository";

export function* deleteRepositoriesWatcher() {
  yield takeLatest(DELETE_REPOSITORY, deleteRepositoryFlow);
}

export function* deleteRepositoryFlow(action: ReturnType<typeof deleteRepository>) {
  yield call(repositoriesAPI.deleteRepositories, action.payload.repository_id);
}