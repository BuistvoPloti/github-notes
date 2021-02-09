import notesSlice from "./note.reducer";

export const { setNotes, deleteNote, updateNote } = notesSlice.actions;
export const noteReducer = notesSlice.reducer;
export default notesSlice;