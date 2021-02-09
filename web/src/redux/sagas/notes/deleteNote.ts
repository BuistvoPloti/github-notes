import { notesAPI } from "../../../api/api";
import { takeLatest, call } from "redux-saga/effects";
import { DELETE_NOTE } from "../../Note/note.types";
import { deleteNote } from "../../Note";

export function* deleteNotesWatcher() {
  yield takeLatest(DELETE_NOTE, deleteNoteFlow);
}

export function* deleteNoteFlow(action: ReturnType<typeof deleteNote>) {
  yield call(notesAPI.deleteNotes, action.payload.note_id);
}