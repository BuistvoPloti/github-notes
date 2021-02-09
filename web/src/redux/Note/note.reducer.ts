import { updateObjectInArray } from "../../utils/object-helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {INote, SetNotesType, DeleteNoteType, UpdateNoteType} from "../../types/types";

type InitialStateType = {
  notes: INote[],
}

const INITIAL_STATE: InitialStateType = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState: INITIAL_STATE,
  reducers: {
    setNotes: {
      reducer: (state, action: PayloadAction<SetNotesType>) => {
        state.notes = action.payload.notes;
      },
      prepare: (notes) => ({ payload: { notes } }),
    },
    deleteNote: {
      reducer: (state, action: PayloadAction<DeleteNoteType>) => {
        state.notes = state.notes.filter(
          (note) => note.id != action.payload.note_id
        );
      },
      prepare: (note_id) => ({ payload: { note_id } }),
    },
    updateNote: {
      reducer: (state, action: PayloadAction<UpdateNoteType>) => {
        state.notes = updateObjectInArray(
          state.notes,
          action.payload.note.id,
          action.payload.note
        );
      },
      prepare: (note) => ({ payload: { note } }),
    },
  },
});

export default notesSlice;
