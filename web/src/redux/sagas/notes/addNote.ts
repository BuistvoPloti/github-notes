import { notesAPI } from "../../../api/api";
import { takeLatest, call, put } from "redux-saga/effects";
import { setNotes } from "../../Note";
import { ADD_NOTE } from "../../Note/note.types";
import { addNote } from "../../Note/note.actions";

export function* addNoteWatcher() {
  yield takeLatest(ADD_NOTE, addNoteFlow);
}

export function* addNoteFlow(action: ReturnType<typeof addNote>) {
  yield call(notesAPI.createNoteRequest, action.payload.note);
  const notes = yield call(notesAPI.getNotes);
  yield put(setNotes(notes))
}