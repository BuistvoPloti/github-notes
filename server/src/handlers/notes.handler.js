const { resolveServicePath } = require("../utils/helpers");

const notesService = require(resolveServicePath("notes"));

const {
  handleSuccessResponse,
  handleErrorResponse,
  validateQueryData,
} = require("../utils/response-helpers");

const getNotes = (req, res, next) => {
  notesService
    .getNotes(
      req.session.login,
      req.session.login,
      req.signedCookies.access_token
    )
    .then((notes) => {
      handleSuccessResponse({ notes }, res);
    })
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

const getNoteById = (req, res, next) => {
  notesService
    .getNoteById(
      req.params.id,
      req.session.login,
      req.signedCookies.access_token
    )
    .then((note) => {
      validateQueryData(note);
      return note;
    })
    .then(note => handleSuccessResponse({ note }, res))
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

const createNote = (req, res, next) => {
  const noteBody = {
    repository_id: req.body.repository_id,
    creator_id: req.body.creator_id,
    text: req.body.text,
    created_at: new Date(),
  };

  notesService
    .createNote(noteBody)
    .then(note => handleSuccessResponse({ note }, res, 201))
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

const updateNote = (req, res, next) => {
  const newNoteBody = {
    text: req.body.text,
    repository_id: req.body.repository_id,
  };

  notesService
    .updateNote(req.params.id, newNoteBody)
    .then(note => handleSuccessResponse({ note }, res, 201))
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

const deleteNote = (req, res, next) => {
  notesService
    .deleteNote(req.params.id)
    .then((note) => {
      validateQueryData(note);
      return note;
    })
    .then(() => handleSuccessResponse(null, res, 202))
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};
