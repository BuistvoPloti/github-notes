import { SET_NOTES, DELETE_NOTE, UPDATE_NOTE } from "./note.types";

export const setNotes = (notes) => {
  return {
    type: SET_NOTES,
    notes,
  };
};

export const updateNoteAC = (note, note_id) => {
  return {
    type: UPDATE_NOTE,
    note,
    note_id,
  };
};

export const deleteNoteAC = (note_id) => {
  return {
    type: DELETE_NOTE,
    note_id,
  };
};