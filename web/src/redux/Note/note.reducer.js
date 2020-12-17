import { DELETE_NOTE, SET_NOTES, UPDATE_NOTE } from "./note.types";
import { notesAPI } from "../../api/api";
import { deleteNoteAC, setNotes, updateNoteAC } from "./note.actions";
import { updateObjectInArray } from "../../utils/object-helpers";

const INITIAL_STATE = {
  notes: [],
};

const noteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NOTES:
      return {
        ...state,
        notes: action.notes,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.note_id),
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: updateObjectInArray(state.notes, action.note_id, action.note),
      };
    default:
      return state;
  }
};

export const requestNotes = () => {
  return async (dispatch) => {
    let data = await notesAPI.getNotes();
    dispatch(setNotes(data));
  };
};

export const deleteRequestNote = (note_id) => {
  return async (dispatch) => {
    await notesAPI.deleteNotes(note_id);
    dispatch(deleteNoteAC(note_id));
  };
};

export const updateNote = (note) => {
  return async (dispatch) => {
    await notesAPI.updateNoteRequest(note, note.id);
    dispatch(updateNoteAC(note, note.id));
  };
};

export const addNote = (note) => {
  return async (dispatch) => {
    await notesAPI.createNoteRequest(note);
    //dispatch(addNoteAC(note)) might use it instead
    const data = await notesAPI.getNotes();
    dispatch(setNotes(data));
  };
};

export default noteReducer;
