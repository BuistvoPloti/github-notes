import { INote, ReqResNextTypes } from "../types/types";
import {
  handleErrorResponse,
  handleSuccessResponse,
  validateQueryData
} from "../utils/response-helpers";
import {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} from "./notes.handler";
import { services } from "../services/db-resolver.service";

const { notesService } = services;

const getAuthNotes: ReqResNextTypes = async (req, res, next) => {
  try {
    const notes: INote[] = await notesService.getAuthNotes(
      req.session.login,
      req.session.login,
      req.signedCookies.access_token
    );
    return handleSuccessResponse({ notes }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const getAuthNoteById: ReqResNextTypes = async (req, res, next) => {
  try {
    const note: INote = await notesService.getNoteByIdAuth(
      req.params.id,
      req.session.login,
      req.signedCookies.access_token
    );
    validateQueryData(note);
    return handleSuccessResponse({ note }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

export {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
  getAuthNotes,
  getAuthNoteById,
};
