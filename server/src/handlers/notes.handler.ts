import { INote, ReqResNextTypes } from "../types/types";
import {
  isReqBodyValid,
  handleErrorResponse,
  handleSuccessResponse,
  validateQueryData
} from "../utils/response-helpers";
import { services } from "../services/db-resolver.service";

const { notesService } = services;

const getNotes: ReqResNextTypes = async (_req, res, next) => {
  try {
    const notes: INote[] = await notesService.getNotes();
    return handleSuccessResponse({ notes }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const getNoteById: ReqResNextTypes = async (req, res, next) => {
  try {
    const note: INote = await notesService.getNoteById(req.params.id);
    validateQueryData(note);
    return handleSuccessResponse({ note }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const createNote: ReqResNextTypes = async (req, res, next) => {
  const creatorId: string = req.body.creator_id === req.session.login
    ? req.body.creator_id
    : null;
  try {
    if (!req.signedCookies.access_token) {
      const repositoryExists = await notesService
        .checkIfRelatedRepositoryExist(req.body.repository_id);
      validateQueryData(repositoryExists);
    }
    const noteBody = {
      repository_id: req.body.repository_id,
      creator_id: creatorId,
      text: req.body.text,
      created_at: new Date(),
    };
    const note: INote = await notesService.createNote(
      noteBody
    );
    return handleSuccessResponse({ note }, res, 201);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const updateNote: ReqResNextTypes = async (req, res, next) => {
  const creatorId: string | null = req.session.login || null;
  try {
    let repositoryExists = false;
    if (!req.signedCookies.access_token) {
      repositoryExists = await notesService
        .checkIfRelatedRepositoryExist(req.body.repository_id);
      validateQueryData(repositoryExists);
    }
    const newNoteBody = {
      text: req.body.text,
      repository_id: req.body.repository_id,
    };
    if (!isReqBodyValid(newNoteBody)) {
      handleErrorResponse(res, {});
      return next({});
    }
    const updatedNote: INote = await notesService.updateNote(
      req.params.id,
      newNoteBody,
      creatorId
    );
    return handleSuccessResponse({ updatedNote }, res, 201);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const deleteNote: ReqResNextTypes = async (req, res, next) => {
  const creatorId: string | null = req.session.login || null;
  const noteId: string = req.params.id;
  try {
    const deletedNote: INote | null | number = await notesService.deleteNote(noteId, creatorId);
    validateQueryData(deletedNote);
    return handleSuccessResponse(deletedNote, res, 202);
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
  deleteNote
};
