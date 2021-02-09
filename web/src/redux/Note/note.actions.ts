import { LOAD_NOTES, ADD_NOTE } from "./note.types";
import { createAction } from "@reduxjs/toolkit";

export const loadNotes = createAction(LOAD_NOTES);

export const addNote = createAction(ADD_NOTE, note => (
  {
    payload: {
      note,
    }
  }
));