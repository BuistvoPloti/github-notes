import { notesAPI } from "../../../api/api";
import { takeLatest, call } from "redux-saga/effects";
import { UPDATE_NOTE } from "../../Note/note.types";
import { updateNote } from "../../Note";

export function* updateNoteWatcher() {
  yield takeLatest(UPDATE_NOTE, updateNoteFlow);
}

export function* updateNoteFlow(action: ReturnType<typeof updateNote>) {
  yield call(notesAPI.updateNoteRequest, action.payload.note, action.payload.note.id);
}



