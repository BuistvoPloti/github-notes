import { notesAPI } from "../../../api/api";
import { delay, takeLatest, call, put } from "redux-saga/effects";
import { setNotes } from "../../Note";
import { LOAD_NOTES } from "../../Note/note.types";

export function* loadNotesWatcher() {
  yield takeLatest(LOAD_NOTES, loadNotesFlow);
}

export function* loadNotesFlow() {
  yield delay(200);
  const notes = yield call(notesAPI.getNotes);
  yield put(setNotes(notes));
}