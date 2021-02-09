import { fork } from "redux-saga/effects";
import { loadRepositoriesWatcher } from "./sagas/repositories/loadRepositories";
import { deleteRepositoriesWatcher } from "./sagas/repositories/deleteRepository";
import { addRepositoryWatcher } from "./sagas/repositories/addRepository";
import { updateRepositoryWatcher } from "./sagas/repositories/updateRepository";
import { loadNotesWatcher } from "./sagas/notes/loadNotes";
import { deleteNotesWatcher } from "./sagas/notes/deleteNote";
import { addNoteWatcher } from "./sagas/notes/addNote";
import { updateNoteWatcher } from "./sagas/notes/updateNote";
import { initializeAppWatcher } from "./sagas/application/application";

export function* rootSaga() {
  yield fork(loadRepositoriesWatcher);
  yield fork(deleteRepositoriesWatcher);
  yield fork(addRepositoryWatcher);
  yield fork(updateRepositoryWatcher);
  yield fork(loadNotesWatcher);
  yield fork(deleteNotesWatcher);
  yield fork(addNoteWatcher);
  yield fork(updateNoteWatcher);
  yield fork(initializeAppWatcher);
}